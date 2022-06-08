SCookie = document.getElementById("Cookie");
SPlayground = document.getElementById("Playground");
Samogus1 = document.getElementById("Amogus1");
H2Text = document.getElementById("ScoreH2");

coords = getOffset(SPlayground);


Cookie = {x: 0, y: 0, Terrain: SCookie}
Amogus1 = {x: 0, y: 0, Terrain: Samogus1}


class Sprite {
    constructor(id) {
        this.id = id;
        this.dom = document.getElementById(id);
        this.hauteur = this.dom.offsetHeight;
        this.largeur = this.dom.offsetWidth;
        this.x = 0;
        this.y = 0;
    }
    setPos(x,y) {
        if (x < 0) {
            x=0;
            
        }
        if (y < 0) {
            y=0;
        }
        if (x > SPlayground.offsetWidth - this.largeur) {
            x = SPlayground.offsetWidth - this.largeur;
            
        }
        if (y > SPlayground.clientHeight - this.hauteur) {
            y=SPlayground.clientHeight - this.hauteur;
        }            
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
        this.x = x;
        this.y = y;
    }
    move(x,y) {
        this.x += x;
        this.y += y;
        this.setPos(x,y);
    }
    ismovepossible(x,y,sprite) {
        
    }
}

score = 0;

H2Text.setScore = function(score) {
    this.textContent = "Score : " + score;
}

cookie = new Sprite("Cookie");

amogus = [];

for (i=0; i < 5; i++) {
    amogus[i] = new Sprite("Amogus" + (i + 1));
}
action1=0
document.onclick = function(e ) {
    if(action1 == 0) {
    //Taille Cookie
    domai = document.getElementById("Cookie");
    hauteur = domai.offsetHeight/2;
    largeur = domai.offsetWidth/2;

    //Coords Cookie
    Cx = Cookie.x; 
    Cy = Cookie.y; 
    //Coords souris
    xs = e.clientX - coords.left;
    ys = e.clientY - coords.top;

    //Calcule
    goX = (xs - Cx - largeur);
    goY = (ys - Cy - hauteur);

    cookie.move(goX, goY);
    score++;
    H2Text.setScore(score);
    action1 = 1;
} else {
    action1 = 0;
    for(amoNo = 0; amoNo < 5; amoNo++){
        amoX=Math.random()*SPlayground.offsetWidth;
        AmoY=Math.random()*SPlayground.clientHeight;
        ismovepossible(amoX,amoY,cookie);
        amogus[amoNo].move(amoX,AmoY);
    }
}
}
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }