const fs = require("fs");
export class Forms
{
    public Canvas = require("canvas");
    public canvas:import("canvas").Canvas = new this.Canvas.Canvas(1920,1080);
    public ctx = this.canvas.getContext('2d');
    protected x:number = 0;
    protected y:number = 0;
    protected size:number = 50;
    protected color:string = "black";
    protected height: number = 100;
    protected width: number = 100;
    protected lineWidth:number = 1;
    protected radius:number = 50;
    protected path:string = "https://cdn.discordapp.com/attachments/715079889593565264/801931382833807360/unknown.png";
    protected isCircle:boolean = false;
    protected fontFamily:string = "Arial";
    protected text:string = "";
    protected textAlign: "left" | "right" | "center" = "center";
    protected endX:number = this.x + 50;
    protected endY:number = this.y + 50;
    protected spikes:number = 5;
    protected outerRadius:number = 30;
    protected innerRadius:number = 15;
    protected sideAB:number = 0;
    protected sideAC:number = 0;
    protected sideBC:number = 0;
    protected rotate:number = 0;
    private rot:number = Math.PI / 2 * 3;
    protected fill(color: string)
    {
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    protected stroke(color: string)
    {
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    setCanvasSize(height: number, width: number)
    {
        if(height) this.canvas.height = height;
        if(width) this.canvas.width = width;
    }
    createCircle(options: CircleOptions) : CircleReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.color) options.color = this.color;
        if(!options.radius && options.radius != 0) options.radius = this.radius;
        let main = this;
        return ({ x:options.x, y:options.y, radius:options.radius, color:options.color,
            draw(_options: CircleDrawOptions) : CircleReturn
            {
                if(!_options) _options ={};
                if(!_options.drawType) _options.drawType = "fill";
                let x:any = _options.x == 0 ? 0 : _options.x || options.x;
                let y:any = _options.y == 0 ? 0 : _options.y || options.y;
                let radius:any = _options.radius || options.radius;
                let color:any = _options.color || options.color;
                main.ctx.beginPath();
                main.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                main.ctx.closePath();
                if(_options.drawType == 'fill') main.fill(color);
                else if(_options.drawType == 'stroke') main.stroke(color);
                let sub = this;
                return {x,y,radius,color, draw(options: CircleDrawOptions): CircleReturn{ return sub.draw(options)}}
            }
        })
    }
    createText(options: TextOptions) : TextReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.fontFamily) options.fontFamily = this.fontFamily;
        if(!options.text) options.text = this.text;
        if(!options.textAlign) options.textAlign = this.textAlign;
        if(!options.width) options.width = 0;
        if(!options.color) options.color = this.color;
        if(!options.size || options.size != 0) options.size = this.size;
        let main = this;
        function fill({text,color,size,x,y,width,fontFamily,textAlign,isWidth})
        {
            main.ctx.beginPath();
            main.ctx.font = `${size}px ${fontFamily}`;
            main.ctx.textAlign =textAlign;
            main.ctx.fillStyle = color;
            if(isWidth) main.ctx.fillText(text,x,y,width);
            else main.ctx.fillText(text,x,y);
            main.ctx.closePath();
        }
        function stroke({text,color,size,x,y,width,fontFamily,textAlign,isWidth})
        {
            main.ctx.beginPath();
            main.ctx.font = `${size}px ${fontFamily}`;
            main.ctx.textAlign =textAlign;
            main.ctx.strokeStyle = color;
            if(isWidth) main.ctx.strokeText(text, x, y ,width);
            else  main.ctx.strokeText(text, x, y);
            main.ctx.closePath();
        }
        return({x:options.x, y:options.y, size:options.size, text:options.text, width:options.width, color:options.color, fontFamily:options.fontFamily, textAlign:options.textAlign, 
            draw(_options: TextDrawOptions) : TextReturn
            {
                if(!_options) _options ={};
                if(!_options.drawType) _options.drawType = "fill";
                let x:any = _options.x == 0 ? 0 : _options.x || options.x,
                y:any = _options.y == 0 ? 0 : _options.y || options.y,
                size:any = _options.size || options.size,
                fontFamily:any = _options.fontFamily || options.fontFamily,
                textAlign:any = _options.textAlign || options.textAlign, 
                text:any = _options.text || options.text,
                color:any = _options.color || options.color,
                width:any = _options.width || options.width,
                isWidth:any = width > 0 ? true : false;
                if(_options.drawType == 'fill') fill({text,color,size,x,y,width,fontFamily,textAlign,isWidth});
                else if(_options.drawType == 'stroke') stroke({text,color,size,x,y,width,fontFamily,textAlign,isWidth});
                let sub = this;
                return {x,y,size,text,width,color,fontFamily,textAlign, draw(options: TextDrawOptions) : TextReturn { return sub.draw(options)}}
            }})
    }
    createRect(options: RectOptions) : RectReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.width && options.width != 0) options.width = this.width;
        if(!options.height && options.height != 0) options.height = this.height;
        if(!options.color) options.color = this.color;
        let main = this;
        function fill({x,y,width,height,color})
        {
            main.ctx.beginPath();
            main.ctx.fillStyle = color;
            main.ctx.fillRect(x,y,width,height);
            main.ctx.closePath();
        }
        function stroke({x,y,width,height,color})
        {
            main.ctx.beginPath();
            main.ctx.strokeStyle = color;
            main.ctx.strokeRect(x,y,width,height);
            main.ctx.closePath();
        }
        return({x:options.x,y:options.y,width:options.width,height:options.height,color:options.color,
            draw(_options: RectDrawOptions) : RectReturn
            {
                if(!_options) _options ={};
                if(!_options.drawType) _options.drawType = "fill";
                let x= _options.x == 0 ? 0 : _options.x || options.x,
                y= _options.y == 0 ? 0 :_options.y || options.y,
                width= _options.width || options.width,
                height= _options.height || options.height,
                color= _options.color || options.color;
                if(_options.drawType == 'fill') fill({x,y,width,height,color});
                else if(_options.drawType == 'stroke') stroke({x,y,width,height,color});
                let sub = this;
                return {x,y,width,height,color, draw(options: RectDrawOptions) : RectReturn { return sub.draw(options)}}
            }
        })
    }
    createLine(options: LineOptions) : LineReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.endX && options.endX != 0) options.endX = this.endX;
        if(!options.endY && options.endY != 0) options.endY = this.endY;
        if(!options.lineWidth && options.lineWidth != 0) options.lineWidth = this.lineWidth;
        if(!options.color) options.color = this.color;
        let main = this;
        return ({x:options.x, y:options.y, endX:options.endX, endY:options.endY, lineWidth:options.lineWidth, color:options.color,
            draw(_options: LineDrawOptions) : LineReturn
            {
                if(!_options) _options ={};
                let x:any = _options.x == 0 ? 0 : _options.x || options.x,
                y:any = _options.y == 0 ? 0 : _options.y || options.y,
                endX:any = _options.endX || options.endX,
                endY:any = _options.endY || options.endY,
                lineWidth:any = _options.lineWidth || options.lineWidth,
                color:any = _options.color || options.color;
                main.ctx.beginPath();
                main.ctx.lineWidth= lineWidth;
                main.ctx.moveTo(x,y);
                main.ctx.lineTo(endX,endY);
                main.stroke(color);
                main.ctx.closePath();
                let sub = this;
                return {x,y,endX,endY,lineWidth,color, draw(options: LineDrawOptions) : LineReturn{ return sub.draw(options)}}
            }
        })
    }
    createRhombus(options: RhombusOptions) : RhombusReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.width && options.width != 0) options.width = this.width;
        if(!options.height && options.height != 0) options.height = this.height;
        if(!options.lineWidth && options.lineWidth != 0) options.lineWidth = this.lineWidth;
        if(!options.color) options.color = this.color;
        let main = this;
        return({x:options.x, y:options.y, width:options.width, height:options.height, color:options.color, lineWidth:options.lineWidth,
            draw(_options: RhombusDrawOptions) : RhombusReturn
            {
                if(!_options) _options ={};
                if(!_options.drawType) _options.drawType = "fill";
                let x:any= _options.x == 0 ? 0 : _options.x || options.x,
                y:any= _options.y == 0 ? 0 :_options.y || options.y,
                width:any= _options.width || options.width,
                height:any= _options.height || options.height,
                color:any= _options.color || options.color,
                lineWidth :any= _options.lineWidth || options.lineWidth;
                main.ctx.beginPath();
                main.ctx.moveTo(x,y-height);
                main.ctx.lineTo(x-width,y);
                main.ctx.lineTo(x,y+height);
                main.ctx.lineTo(x+width,y);
                main.ctx.closePath();
                main.ctx.lineWidth = lineWidth;
                if(_options.drawType == 'fill') main.fill(color);
                else if(_options.drawType == 'stroke') main.stroke(color);
                let sub = this;
                return {x,y,width,height,lineWidth,color, draw(options: RhombusDrawOptions) : RhombusReturn { return sub.draw(options)}}
            }
        })
    }
    createStar(options: StarOptions) : StarReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.spikes  && options.spikes != 0) options.spikes = this.spikes;
        if(!options.outerRadius  && options.outerRadius != 0) options.outerRadius = this.outerRadius;
        if(!options.innerRadius  && options.innerRadius != 0) options.innerRadius = this.innerRadius;
        if(!options.lineWidth  && options.lineWidth != 0) options.lineWidth = this.lineWidth;
        if(!options.color) options.color = this.color;
        let main = this;
        return ({x:options.x, y:options.y, spikes:options.spikes, outerRadius:options.outerRadius, innerRadius:options.innerRadius, color:options.color, lineWidth:options.lineWidth,
            draw(_options: StarDrawOptions) : StarReturn
            {
                if(!_options) _options ={};
                if(!_options.drawType) _options.drawType = "fill";
                let x:any= _options.x == 0 ? 0 : _options.x || options.x,
                y:any= _options.y == 0 ? 0 :_options.y || options.y,
                spikes:any= _options.spikes || options.spikes,
                outerRadius:any= _options.outerRadius || options.outerRadius,
                innerRadius:any= _options.innerRadius || options.innerRadius,
                color:any= _options.color || options.color,
                lineWidth:any= _options.lineWidth || options.lineWidth,
                rx = x,
                ry = y,
                step = Math.PI / spikes;
                main.ctx.beginPath();
                main.ctx.moveTo(x,y - outerRadius);
                for (let i = 0; i < spikes; i++)
                {
                    rx = x + Math.cos(main.rot) * outerRadius;
                    ry = y + Math.sin(main.rot) * outerRadius;
                    main.ctx.lineTo(rx,ry);
                    main.rot += step;
        
                    rx = x + Math.cos(main.rot) * innerRadius;
                    ry = y + Math.sin(main.rot) * innerRadius;
                    main.ctx.lineTo(rx,ry);
                    main.rot += step;
                }
                main.ctx.lineTo(x,y - outerRadius);
                main.ctx.closePath();
                main.ctx.lineWidth = lineWidth;
                if(_options.drawType == 'fill') main.fill(color);
                else if(_options.drawType == 'stroke') main.stroke(color);
                let sub = this;
                return {x,y,spikes,outerRadius,innerRadius,lineWidth,color,step, draw(options: StarDrawOptions) : StarReturn { return sub.draw(options)}}
            }
        })
    }
    createImage(options: ImageOptions) : ImageReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.width && options.width != 0) options.width = this.width;
        if(!options.height && options.height != 0) options.height = this.height;
        if(!options.path) options.path = this.path;
        if(!options.isCircle) options.isCircle = this.isCircle;
        if(!options.radius && options.radius != 0) options.radius = this.radius;
        let main = this;
        return({x: options.x, y:options.y, width:options.width, height:options.height, radius:options.radius, path:options.path, isCircle:options.isCircle,
            async draw(_options: ImageOptions) : Promise<ImageReturn>
            {
                if(!_options) _options ={};
                let radius:any = _options.radius || options.radius, 
                isCircle:any = _options.isCircle || options.isCircle,
                x= isCircle ? (_options.x == 0 ? 0 : _options.x || options.x) : _options.x || options.x,
                y= isCircle ? (_options.y == 0 ? 0 : _options.y || options.y) : _options.y || options.y,
                width= isCircle ? radius * 2 : _options.width || options.width,
                height= isCircle ? radius * 2 : _options.height || options.height,
                path:any = _options.path || options.path;
                if(isCircle)
                {
                    main.ctx.save();
                    main.ctx.beginPath();
                    main.ctx.arc(x+radius,y+radius,radius,0,Math.PI * 2,false);
                    main.ctx.clip();
                    main.ctx.strokeStyle = "rgba(0,0,0,0)";
                    main.ctx.stroke();
                    main.ctx.closePath();
                }
                let img = await main.Canvas.loadImage(path);
                main.ctx.drawImage(img,x,y,width,height);
                if(isCircle) main.ctx.restore();
                let sub = this;
                return {path,x,y,radius, height, width, draw(options: ImageOptions) : Promise<ImageReturn> { return sub.draw(options)}}
            }
        })
    }
    createTriangle(options: TriangleOptions) : TriangleReturn
    {
        if(!options) options ={};
        if(!options.x) options.x = this.x;
        if(!options.y) options.y = this.y;
        if(!options.sideAB) options.sideAB = this.sideAB;
        if(!options.sideAC) options.sideAC = this.sideAC;
        if(!options.sideBC) options.sideBC = this.sideBC;
        if(!options.rotate) options.rotate = this.rotate;
        if(!options.color) options.color = this.color;
        if(!options.size && options.size != 0) options.size = this.size;
        let main = this;
        return({x: options.x, y:options.y, color:options.color, sideAB: options.sideAB, sideAC: options.sideAC, sideBC: options.sideBC, rotate: options.rotate ,size: options.size,
            draw(_options: TriangleDrawOptions) : TriangleReturn
            {
                if(!_options) _options ={};
                let size:any = _options.size == 0 ? 0 : _options.size || options.size,
                x:any= _options.x == 0 ? 0 : _options.x || options.x,
                y:any= _options.y == 0 ? 0 : _options.y || options.y,
                rotate:any= _options.rotate == 0 ? 0 : _options.rotate || options.rotate == 0,
                sideAB:any= _options.sideAB == 0 ? 0 : _options.sideAB || options.sideAB == 0,
                sideAC:any= _options.sideAC == 0 ? 0 : _options.sideAC || options.sideAC == 0,
                sideBC:any= _options.sideBC == 0 ? 0 : _options.sideBC || options.sideBC == 0,
                color:any= _options.color || options.color;
                sideAB = sideAB / 100;
                sideAC = sideAC / 100;
                sideBC = sideBC / 200;
                let v = 
                [
                    [sideAB - sideAC, - sideAB - sideAC - 1], 
                    [-sideAB - sideBC - 0.6, sideAB], 
                    [0.6 + sideAC + sideBC, sideAC]
                ];
                main.ctx.beginPath();
                main.ctx.save();
                main.ctx.translate(x,y)
                main.ctx.rotate(rotate * Math.PI / 180);
                main.ctx.scale(size, size);
                main.ctx.beginPath();
                main.ctx.moveTo(v[0][0],v[0][1]);
                main.ctx.lineTo(v[1][0],v[1][1]);
                main.ctx.lineTo(v[2][0],v[2][1]);
                main.ctx.closePath();
                main.ctx.fillStyle = color+"";
                main.ctx.fill();
                main.ctx.restore();
                let sub = this;
                return {x, y, size, sideAB, sideAC, sideBC, draw(options:  TriangleDrawOptions) : TriangleReturn { return sub.draw(options)}}
            }})
    }
    toSave(path: string, type:"jpeg" | "png" = "png") : import("canvas").PNGStream | import("canvas").JPEGStream
    {
        let stream;
        if(!path) path = (Math.floor(Math.random() * 7508567556840459) + 111111111).toString();
        if(type == "jpeg") stream = this.canvas.createJPEGStream().pipe(fs.createWriteStream(path+".jpeg"));
        else if(type == "png") stream = this.canvas.createPNGStream().pipe(fs.createWriteStream(path+".png"));
        return stream;
    }
    toBuffer() : Buffer
    {
        return this.canvas.toBuffer();
    }
    addFontFamily(path: string, setName: string, options?: {style?: string, weight?: string})
    {
        if(!options) options = {};
        this.Canvas.registerFont(path, {family:setName, style: options.style, weight: options.weight});
    }
}

interface Form{
    x?:number,
    y?:number,
    color?:string
}
interface RectOptions extends Form{
    width?:number,
    height?:number
}
interface CircleOptions extends Form{
    radius?: number
}
interface LineOptions extends Form{
    lineWidth?: number,
    endX?:number,
    endY?:number
}
interface TextOptions extends Form{
    text?:string,
    size?:number, 
    fontFamily?:string,
    textAlign?:"left" | "center" | "right", 
    width?:number
}
interface RhombusOptions extends RectOptions{
    lineWidth?:number
}
interface ImageOptions{
    path?:string,
    x?:number,
    y?:number,
    width?:number,
    height?:number, 
    radius?:number, 
    isCircle?:boolean
}
interface StarOptions extends Form{
    spikes?:number,
    outerRadius?:number,
    innerRadius?:number,
    lineWidth?:number
}
interface TriangleOptions extends Form{
    sideAB?: number,
    sideAC?: number,
    sideBC?: number,
    rotate?: number,
    size?: number
}
////////////////////////////////////
interface RectDrawOptions extends RectOptions{
    drawType?: "fill" | "stroke"
}
interface CircleDrawOptions extends CircleOptions{
    drawType?: "fill" | "stroke"
}
interface LineDrawOptions extends LineOptions{
    drawType?: "fill" | "stroke"
}
interface TextDrawOptions extends TextOptions{
    drawType?: "fill" | "stroke"
}
interface RhombusDrawOptions extends RhombusOptions{
    drawType?: "fill" | "stroke"
}
interface StarDrawOptions extends StarOptions{
    drawType?: "fill" | "stroke",
}
interface TriangleDrawOptions extends TriangleOptions{
    drawType?: "fill" | "stroke"
}
////////////////////////////////////
interface RectReturn extends RectOptions{
    draw(options: RectDrawOptions): this
}
interface CircleReturn extends CircleOptions{
    draw(options: CircleDrawOptions): this
}
interface LineReturn extends LineOptions{
    draw(options: LineDrawOptions): this
}
interface TextReturn extends TextOptions{
    draw(options: TextDrawOptions): this
}
interface RhombusReturn extends RhombusOptions{
    draw(options: RhombusDrawOptions): this
}
interface StarReturn extends StarOptions{
    draw(options: StarDrawOptions): this,
    step?:number
}
interface TriangleReturn extends TriangleOptions{
    draw(options: TriangleDrawOptions): this
}
interface ImageReturn extends ImageOptions{
    draw(options: ImageOptions): Promise<this>
}
