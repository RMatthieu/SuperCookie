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
}

score = 0;

H2Text.setScore = function(score) {
    this.textContent = "Score : " + score;
}

cookie = new Sprite("Cookie");

amogus = [];

for (i=0; i < 4; i++) {
    amogus[i] = new Sprite("Amogus" + (i + 1));
}

document.onclick = function(e ) {
    iOnClique = 1;

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
    goX = (xs - Cx - largeur)/100;
    goY = (ys - Cy - hauteur)/100;

    for(amoNo = 0; amoNo < 4; amoNo++){
        amogus[amoNo].move(Math.random()*SPlayground.offsetWidth,Math.random()*SPlayground.clientHeight);
    }
    while (iOnClique <= 100) {
        cookie.move(iOnClique * goX, iOnClique * goY);
        iOnClique++;
        console.log(iOnClique);
    }
    score++;
    H2Text.setScore(score);
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }