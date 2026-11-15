"""Generate the blank 3-page paper application with the confirmed 2027 fee policy."""
from pathlib import Path
import sys
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape
OUT=Path(sys.argv[1] if len(sys.argv)>1 else 'output/pdf/Butterflies_Educare_2027_Paper_Registration.pdf')
OUT.parent.mkdir(parents=True,exist_ok=True)
W,H=A4; M=46; RIGHT=W-M; WIDTH=W-2*M
GREEN=colors.HexColor('#245b49'); INK=colors.HexColor('#263d35'); PALE=colors.HexColor('#edf5ef')
c=canvas.Canvas(str(OUT),pagesize=A4);c.setTitle('Butterflies Educare - 2027 Registration and Fees Policy');c.setAuthor('Butterflies Educare')
style=ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=15,textColor=INK)
def para(text,y,size=10):
 p=Paragraph(text,ParagraphStyle('text',parent=style,fontSize=size,leading=size*1.5));_,h=p.wrap(WIDTH,700);p.drawOn(c,M,y-h);return y-h-10

def header(title,page):
 c.setFillColor(GREEN);c.setFont('Times-BoldItalic',27);c.drawString(M,H-52,'Butterflies Educare');c.setFont('Helvetica',9);c.drawString(M,H-69,'NURTURING MINDS, HAPPY HEARTS');c.setStrokeColor(GREEN);c.line(M,H-81,RIGHT,H-81)
 c.setFillColor(INK);c.setFont('Times-Roman',22);c.drawString(M,H-111,title)
 c.setStrokeColor(colors.HexColor('#d4e2d8'));c.line(M,43,RIGHT,43);c.setFont('Helvetica',8);c.setFillColor(GREEN);c.drawString(M,30,'Butterflies Educare | 2027 Application');c.drawRightString(RIGHT,30,f'Page {page} of 3');return H-130

def heading(text,y):
 c.setFillColor(PALE);c.roundRect(M,y-25,WIDTH,27,5,fill=1,stroke=0);c.setFillColor(GREEN);c.setFont('Helvetica-Bold',11);c.drawString(M+10,y-16,text);return y-39

def fields(labels,y):
 for row in labels:
  parts=row if isinstance(row,tuple) else (row,)
  for i,label in enumerate(parts):
   width=(WIDTH-18*(len(parts)-1))/len(parts);x=M+i*(width+18)
   c.setFillColor(INK);c.setFont('Helvetica',9);c.drawString(x,y,label);c.setStrokeColor(colors.HexColor('#97aea1'));c.line(x,y-19,x+width,y-19)
  y-=34
 return y

def check(text,y):
 c.setStrokeColor(GREEN);c.rect(M,y-10,9,9);p=Paragraph(text,style);_,h=p.wrap(WIDTH-20,600);p.drawOn(c,M+18,y-h+2);return y-max(h,13)-13

y=header('2027 Registration Form',1);y=para('Complete clearly in block letters. Return securely to the school. Submitting an application does not guarantee a place.',y)
y=heading("1. Child's information",y);y=fields(['Full name:',('Date of birth:','Age:'),'Gender (optional):','Home address:',('City / town:','Postal code:'),'School grade / class (if applicable):'],y)
y=heading('2. Parent / guardian information',y);y=fields(['Primary parent / guardian name:',('Relationship to child:','Contact number:'),'Email address:',"Mother's name (if applicable):",("Mother's phone:","Mother's email:"),"Father's name (if applicable):",("Father's phone:","Father's email:")],y)
y=heading('Office use only',y);y=fields([('Received on:','Received by:','Notes / follow-up:')],y)
assert y>49,('Page 1 overflow',y)
c.showPage();y=header('Registration Form - Continued',2);y=fields(["Child's full name:"],y)
y=heading('3. Emergency contact (if guardian is unavailable)',y);y=fields(['Full name:',('Relationship to child:','Contact number:')],y)
y=heading('4. Optional medical information - confidential',y);y=fields(['Allergies (food / other):','Medical conditions:','Medication (if any):',"Doctor's name and contact:"],y)
y=check('I consent to secure storage of the optional health information provided above for appropriate learner care.',y)
y=heading('5. Code of Conduct & School Policies',y);y=para('Our community uses kind words and gentle hands, includes others, respects teachers, classmates and school property, and resolves disagreements without aggression. Repeated bullying or fighting is addressed through parent discussions, support and proportionate follow-up under the school\'s approved policy.',y,9)
y=check('I acknowledge the Code of Conduct and positive-behaviour expectations.',y);y=check('I have read and acknowledge the 2027 Fees &amp; Payment Policy on page 3, including the monthly fees, 12-month payments, R100 overdue fine, and fees during absences and operating holidays.',y)
y=heading('6. Parent / guardian declaration',y);y=para('I confirm that I am authorised to apply for this child and that the information is accurate to the best of my knowledge. I understand that the school reviews applications before confirming admission. Completed forms contain personal information and must be returned and stored securely.',y,9)
y=check('I agree to be contacted about this application using the details supplied.',y);y=fields([('Parent / guardian name:','Signature and date:')],y)
assert y>49,('Page 2 overflow',y)
c.showPage();y=header('2027 Fees & Payment Policy',3);y=para('Keep this page with the registration form. All amounts below are monthly fees for 2027.',y)
rows=[['Attendance option','Hours','Monthly fee'],['Half day','7:00 AM - 12:30 PM','R2,350'],['Half day','7:00 AM - 2:00 PM','R2,550'],['Full day','Mon-Thu: 7:00 AM - 5:30 PM\nFriday: 7:00 AM - 5:00 PM','R3,350']]
t=Table(rows,colWidths=[108,WIDTH-196,88]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),GREEN),('TEXTCOLOR',(0,0),(-1,0),colors.white),('BACKGROUND',(0,1),(-1,-1),PALE),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTNAME',(-1,1),(-1,-1),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),10),('LEADING',(0,0),(-1,-1),15),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.5,colors.white)]));_,h=t.wrap(WIDTH,600);t.drawOn(c,M,y-h);y-=h+27
y=heading('Payment terms',y)
for item in ['Fees are payable over <b>12 months</b>.','Overdue fees incur a <b>R100 fine</b> under the school\'s existing policy.','Fees remain payable when a child is absent.','The school operates normally during the <b>March, June and September school holidays</b>; full fees remain payable.','Existing debit-order arrangements continue. Confirm the payment date and payment instructions directly with the school. No online school-fee payments are collected on the website.']:y=para('- '+item,y)
y=heading('Parent / guardian acknowledgement',y);y=check('I have read the fees and payment terms above. I understand that submitting a registration form does not confirm a place.',y);y=fields(["Child's full name:",'Parent / guardian name:',('Signature:','Date:')],y)

y=para('<b>School contact</b>: 083 471 7929 | Butterfliesedu@gmail.com<br/>84 Dirkie Uys Street, Goodwood',y,9)
assert y>49,('Page 3 overflow',y)
c.save();print(OUT)
