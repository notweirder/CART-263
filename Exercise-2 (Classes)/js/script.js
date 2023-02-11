
let ball = []; //declare array

function preload ()
{

}
function setup ()
{
    createCanvas(400,400);
    for (let i = 0; i<100; i ++)
    {
        ball[i] = new Particle();
    }
} 
function draw ()
{
background(200,50,100);
for (let i = 0; i<100; i ++)
    {
        ball[i].display();
    }
}

class Particle {
    constructor()
    {
        this.size = random(20)
        this.x = random(width);
        this.y = random(height);
        this.speed = -5;
    }
    display()
     {
        if (this.x>width || this.x<0)
        {
            this.speed*=-1;
        }
        if (this.y > height || this.y <0 )
        {
            this.speed*=-1;
        }
        this.x += random(-this.speed,this.speed);
        this.y += random(-this.speed,this.speed);

        print ('mouseX:', mouseX)
        print('before map', this.speed)
        this.speed = map(mouseX,0,400,0,5, true)
        print('after map',this.speed)
        
        
        fill(this.x,0,0, mouseX)
        ellipse(this.x,this.y,this.size)
     }
    }
