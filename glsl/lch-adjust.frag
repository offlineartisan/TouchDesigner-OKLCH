// Oklab color space shader
// Conversion function from https://bottosson.github.io/posts/oklab/
// Orginal TD Implementations by percolated_

// Unified LCH conversion, value adjustments, and output back to sRGBColor.
// Meant to mimic similiar functions to the native HSVAdjust top.
// ver 0.0.1
// by offlineartisan

uniform float lightnessMult;
uniform float lightnessMax;
uniform float lightnessMin;

uniform float chromaMult;
uniform float chromaMax;
uniform float chromaMin;
uniform float hueOffset;

out vec4 RGB;

float cbrtf(float x){
    float s=sign(x);
    return s*exp(log(abs(x)+1e-10)/3.);
}

vec3 oklab_to_linear_srgb(vec3 c)
{
    float l_=c.x+.3963377774*c.y+.2158037573*c.z;
    float m_=c.x-.1055613458*c.y-.0638541728*c.z;
    float s_=c.x-.0894841775*c.y-1.2914855480*c.z;
    
    float l=l_*l_*l_;
    float m=m_*m_*m_;
    float s=s_*s_*s_;
    
    return vec3(
        +4.0767416621*l-3.3077115913*m+.2309699292*s,
        -1.2684380046*l+2.6097574011*m-.3413193965*s,
        -.0041960863*l-.7034186147*m+1.7076147010*s
    );
}

vec3 linear_srgb_to_oklab(vec3 c)
{
    float l=.4122214708f*c.r+.5363325363f*c.g+.0514459929f*c.b;
    float m=.2119034982f*c.r+.6806995451f*c.g+.1073969566f*c.b;
    float s=.0883024619f*c.r+.2817188376f*c.g+.6299787005f*c.b;
    
    float l_=cbrtf(l);
    float m_=cbrtf(m);
    float s_=cbrtf(s);
    
    return vec3(
        .2104542553f*l_+.7936177850f*m_-.0040720468f*s_,
        1.9779984951f*l_-2.4285922050f*m_+.4505937099f*s_,
        .0259040371f*l_+.7827717662f*m_-.8086757660f*s_
    );
}

vec3 srgbToLinear(vec3 c){
    return pow(max(c,0.),vec3(2.2));
}

vec3 linearToSrgb(vec3 c){
    return pow(max(c,0.),vec3(1./2.2));
}

void main()
{
    vec4 color=texture(sTD2DInputs[0],vUV.st);
    vec3 linearColor=srgbToLinear(color.rgb);
    vec3 labcolor=linear_srgb_to_oklab(linearColor),
    lchcolor=vec3(labcolor.x,sqrt(labcolor.y*labcolor.y+labcolor.z*labcolor.z),atan(labcolor.z,labcolor.y));
    
    float L=clamp(lchcolor.x*lightnessMult,lightnessMin,lightnessMax),
    C=clamp(lchcolor.y*chromaMult,chromaMin,chromaMax),
    h=mod(lchcolor.z+hueOffset+3.14159265,6.28318530)-3.14159265,
    a=C*cos(h),
    b=C*sin(h);
    
    vec3 sRGBColor=oklab_to_linear_srgb(vec3(L,a,b));
    vec3 finalColor=linearToSrgb(sRGBColor);
    
    RGB=TDOutputSwizzle(vec4(finalColor,color.a));
}
