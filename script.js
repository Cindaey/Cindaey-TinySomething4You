window.onload= ()=> {
const  lofiWannabeButskillissueshhhh= {

    vertex: `    
        precision mediump float;
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix, uPMatrix, dispImageMatrix;
        varying vec3 vVertexPosition;
        varying vec2 ImgPosi;

    void main(){
            gl_Position= uPMatrix*uMVMatrix*vec4(aVertexPosition, 1.0);
            ImgPosi= (dispImageMatrix*vec4(aTextureCoord, 0., 1.)).xy;
            vVertexPosition= aVertexPosition; }`,

    fragment: `
        precision mediump float;
        #define PI2 6.28
        #define S(a, b,n) smoothstep(a,b,n)
        
        varying vec3 vVertexPosition;
        varying vec2 ImgPosi;
        uniform float overTime;
        uniform vec2 ImgResolution, mouseMovement;
        uniform sampler2D dispImage;

    float EheTeNandayo(vec2 p){
          p = fract(p*vec2(123.45, 345.67));
          p += dot(p, p+34.56);
        return fract(p.x*p.y);}
        
        vec3 Layer(vec2 uv0, float t){
          vec2 asp= vec2(2., 1.);
        vec2 uv1= uv0*3.*asp;
            
          float DropletSpd= t*.25;
          uv1.y+= DropletSpd;
          
          vec2 gv= fract(uv1)-.5;
        vec2 id= floor(uv1);
          float n= EheTeNandayo(id);
          t+= n*PI2;
          
          float wobbleFreq= uv0.y*2.;
          float x= (n- .5)*.8;
          x+=(.4-abs(x))*sin(3.*wobbleFreq)*pow(sin(wobbleFreq), 4.)*.41;
          
          float y= -sin(t+sin(t+sin(t)*.5))*.44;

          float ShrinkAtTheEnd= S(-0.4, 0.5, y); 
          float sizeLife= mix(1.0, 0.7, ShrinkAtTheEnd); 
          float dropSize= 0.02 * sizeLife;
          float trailSize= 0.04 * sizeLife;

          vec2 dropPos= (gv-vec2(x, y))/asp; 
          float drop= S(dropSize, dropSize*0.5, length(dropPos));
          float dropStreak= (gv.x-x); 
          float streakShape= S(-0.02, 0.02, gv.y-y); 
          
        float trail= S(trailSize, trailSize*0.2, abs(dropStreak)); 
          trail *= streakShape; 
          trail *= S(0.5, y, gv.y); 
          
        float fogTrail= S(-0.05, 0.05, dropPos.y);
          fogTrail *= S(0.5, y, gv.y);
          fogTrail *= S(trailSize*1.5, trailSize*0.5, abs(dropStreak));
          
        vec2 trailDist= vec2(0.02, 0.0)*trail;
        vec2 dropDist= drop*dropPos;
          
    return vec3(dropDist+trailDist, fogTrail);}

        void main(){      
            vec2 uv= ImgPosi;    
            float t= mod(overTime*0.03, 7200.0);

            vec2 mouseUV= mouseMovement/ImgResolution;
            float aspect= ImgResolution.x/ImgResolution.y;
            vec2 ratio= vec2(aspect, 1.0);
            float dToMouse= distance(uv*ratio, mouseUV*ratio);

            float wipingWindow= S(0.1, 0.15, dToMouse);

            vec3 drops= Layer(uv, t);
            drops+= Layer(uv*1.25+7.54, t);
            drops+= Layer(uv*1.57-7.54, t);

            float blur= 7.0*(1.0-drops.z)*wipingWindow;

            vec4 col= vec4(0.0);
            float a= EheTeNandayo(uv)*PI2;
            blur *= 0.0005;
            
            vec2 UVEffect= uv+drops.xy*2.0; 
                
            for(int n= 0; n<34; n++){
                vec2 off= vec2(sin(a), cos(a))*blur;
                float d= sqrt(fract(sin((float(n)+1.0)*546.0)*5424.0));
                off*= d;
                col+= texture2D(dispImage, UVEffect+off);
                a++;
        } gl_FragColor= col / 34.0; }`};

    const mouse={x: 0, y: 0};
    const webGLCurtain= new Curtains({container: "canvas"});
    const planeElement= document.getElementsByClassName("plane")[0];
    
    const params={
        vertexShader: lofiWannabeButskillissueshhhh.vertex,
        fragmentShader: lofiWannabeButskillissueshhhh.fragment,
        widthSegments: 20,
        heightSegments: 20,
        uniforms:{
            time:{name: "overTime", type: "1f", value: 0},
            mousepos:{name: "mouseMovement", type: "2f", value: [mouse.x, mouse.y]},
            resolution:{name: "ImgResolution", type: "2f", value: [window.innerWidth, window.innerHeight]}
        }
    };

    const plane= webGLCurtain.addPlane(planeElement, params);

    plane.onRender(()=> {
        plane.uniforms.time.value++;
        plane.uniforms.resolution.value = [window.innerWidth, window.innerHeight];
        plane.uniforms.mousepos.value = [mouse.x, window.innerHeight - mouse.y];
    });

    window.addEventListener("mousemove",(e)=> {
        mouse.x= e.clientX;
        mouse.y= e.clientY;
    });

    var textBlur= document.getElementsByClassName('textBlur'),
        arrayText= ['I can see how much work you put into everything you do. Wishing you a restful evening Zero ><'],
        paimonIndex=0;

    function changeText() {
        textBlur[0].innerHTML= arrayText[paimonIndex];
        paimonIndex++;
        if (paimonIndex>= arrayText.length){paimonIndex= 0}
        setTimeout(changeText, 5000)}
    changeText();};

function RainAnimationBG(){
    const RainBG= document.getElementById('rain');
    const NumOfDroplets= 202; 

    for(let i= 0; i < NumOfDroplets; i++){
        const drop= document.createElement('div');
        drop.classList.add('drop');
        const posX= (Math.random()*(window.innerWidth+800))-400;
        
        const RainDuration= Math.random()*0.45+0.25; 
        const RainDelay= Math.random()*-5;

        const opacity= Math.random()*0.4+0.1;
        const width= Math.random()*1.5+0.5;

        drop.style.left= `${posX}px`;
        drop.style.width= `${width}px`;
        drop.style.opacity= opacity;
        drop.style.animation=`fall ${RainDuration}s linear ${RainDelay}s infinite`;
        
        RainBG.appendChild(drop);}
    } RainAnimationBG();

let resizeTimer;
window.addEventListener('resize', ()=> {
clearTimeout(resizeTimer);
    resizeTimer= setTimeout(()=> {
        document.getElementById('rain').innerHTML='';
        RainAnimationBG();
    }, 250);});