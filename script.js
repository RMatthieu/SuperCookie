SCookie = document.getElementById("Cookie")
SPlayground = document.getElementById("Playground")

coords = getOffset(SPlayground)

Cookie = {x: 0, y: 0, Terrain: SCookie}


Cookie.set = function (x,y) {
    box = document.getElementById("Cookie");
    hauteur = box.offsetHeight;
    largeur = box.offsetWidth;
    if (x < 0) {
        x=0;
        
    }
    if (y < 0) {
        y=0;
    }
    if (x > SPlayground.clientWidht + largeur) {
        x = SPlayground.clientWidht + largeur;
        
    }
    if (y > SPlayground.clientHeight - hauteur) {
        y=SPlayground.clientHeight - hauteur;
    }
    
    this.Terrain.style.left = x + "px";
    this.Terrain.style.top = y + "px";
    this.x = x;
    this.y = y;
}


Cookie.move = function (x,y) {
    this.x += x;
    this.y += y;
    this.set(this.x,this.y);
}

document.onclick = function(e ) {
    i = 0;

    //Taille Cookie
    box = document.getElementById("Cookie");
    hauteur = box.offsetHeight/2;
    largeur = box.offsetWidth/2;

    //Coords du cookie
    x=Cookie.x; 
    y=Cookie.y; 

    //Coords souris
    xs = e.clientX -coords.left;
    ys = e.clientY - coords.top;

    //Calcule
    goX = (xs - x - largeur)/100;
    goY = (ys - y - hauteur)/100;


    while (i < 100) {
        Cookie.move(goX,goY)
        i++;
    }
}

n = 10;
Test = function() {
Cookie.move(10,10);
n--;
if (n > 0) {
    setTimeout(Test,10)
}
n = 10;
}


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }