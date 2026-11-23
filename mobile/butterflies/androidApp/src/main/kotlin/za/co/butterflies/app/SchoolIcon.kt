package za.co.butterflies.app

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.view.View

/** Small native line icons stay crisp at every display density. */
class SchoolIcon(context: Context,private val kind: String,private val tint: Int): View(context) {
    private val pen=Paint(Paint.ANTI_ALIAS_FLAG).apply {color=tint;style=Paint.Style.STROKE;strokeWidth=1.7f;strokeCap=Paint.Cap.ROUND;strokeJoin=Paint.Join.ROUND}
    init {importantForAccessibility=IMPORTANT_FOR_ACCESSIBILITY_NO}
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        canvas.save();val scale=minOf(width,height)/24f;canvas.translate((width-24*scale)/2,(height-24*scale)/2);canvas.scale(scale,scale)
        fun line(vararg xy: Float){val p=Path();p.moveTo(xy[0],xy[1]);for(i in 2 until xy.size step 2)p.lineTo(xy[i],xy[i+1]);canvas.drawPath(p,pen)}
        fun box(l:Float,t:Float,r:Float,b:Float,radius:Float=2f){canvas.drawRoundRect(RectF(l,t,r,b),radius,radius,pen)}
        when(kind){
            "home"->{line(3f,10f,12f,3f,21f,10f);line(5f,9f,5f,21f,19f,21f,19f,9f);line(9f,21f,9f,14f,15f,14f,15f,21f)}
            "classes"->{line(12f,6f,12f,21f);line(12f,6f,4f,3f,3f,3f,3f,18f,5f,18f,12f,21f,19f,18f,21f,18f,21f,3f,20f,3f,12f,6f)}
            "events"->{box(3f,5f,21f,21f);line(7f,3f,7f,7f);line(17f,3f,17f,7f);line(3f,10f,21f,10f);line(8f,15f,11f,18f,17f,13f)}
            "inbox"->{line(4f,4f,20f,4f,21f,5f,21f,17f,20f,18f,9f,18f,3f,22f,3f,5f,4f,4f);line(7f,9f,17f,9f);line(7f,13f,14f,13f)}
            "account"->{canvas.drawCircle(12f,7f,4f,pen);canvas.drawArc(RectF(4f,13f,20f,28f),180f,180f,false,pen);line(4f,21f,20f,21f)}
            "children"->{canvas.drawCircle(8f,7f,3f,pen);canvas.drawCircle(17f,9f,2.5f,pen);canvas.drawArc(RectF(2f,12f,14f,26f),180f,180f,false,pen);canvas.drawArc(RectF(13f,14f,22f,25f),180f,180f,false,pen);line(2f,19f,13f,19f);line(14f,20f,22f,20f)}
            "requests"->{box(5f,4f,20f,22f);box(9f,2f,16f,6f,1f);line(8f,11f,11f,14f,17f,9f);line(9f,18f,16f,18f)}
            "offer"->{canvas.drawCircle(12f,12f,9f,pen);line(7f,12f,17f,12f);line(12f,7f,12f,17f)}
            else->{box(4f,3f,20f,21f);line(8f,8f,16f,8f);line(8f,12f,16f,12f);line(8f,16f,14f,16f)}
        }
        canvas.restore()
    }
}
