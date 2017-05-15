var pressed= [];
var up = true;
var down = true;
var left = true;
var right = true;
var space = true;
var bombs = [];
var enemies = [];
var intUp;
var intDown;
var intLeft;
var intRight;
var player;
var playerSpeed = 1;
var vert = 0;
var horz = 0;
var level = 20;
var comp;
var compSpeed = 0.2;
var compCount = 0
$(document).ready(function()
{
  vert = $("#screen").innerHeight()/2;
  horz = $("#screen").innerWidth()/2;
  $("#play").click(function()
  {
    this.remove();
    play();
  });
  function play()
  {
    player = {element:$("<div id='player'/>"), vert:vert, horz:horz, speed:playerSpeed};
    $("#screen").append(player.element);
    movePlayer();
    makeEnemies();
    gameLoop();
  }
  function makeEnemies()
  {
    level++;
    window.setTimeout(function()
    {
      for (var i = 0; i < level; i++)
      {
        createComp();
        compCount++;
      }
    }, 1000);
  }
  // tracks if enemy hits bomb
  function gameLoop()
  {
    window.setInterval(function()
    {
      // fix editing enemies length mid loop
      for (var i = 0; i < enemies.length; i++)
      {
        moveComp(enemies[i]);
        for (var j = 0; j < bombs.length; j++)
        {
          if (collision(enemies[i].element, bombs[j]))
          {
            bombs[j].remove();
            bombs.splice(j, 1);
            enemies[i].element.remove();
            // clearInterval(enemies[i].compInt);
            enemies.splice(i, 1);
            compCount--;
            if (compCount === 0)
            {
              makeEnemies();
            }
          }
        }
      }
    }, 1);
  }
  function movePlayer()
  {
    $(document).keydown(function(e)
    {
      pressed[e.which] = true;
      // left
      if (pressed[37] && left)
      {
        left = false;
        intLeft = setInterval(function()
        {
          player.horz -= playerSpeed;
          check(player);
          player.element.css("left", player.horz+"px");
        }, 1);
      }
      // up
      if (pressed[38] && up)
      {
        up = false;
        intUp = setInterval(function()
        {
          player.vert -= playerSpeed;
          check(player);
          player.element.css("top", player.vert+"px");
        }, 1);
      }
      // right
      if (pressed[39] && right)
      {
        right = false;
        intRight = setInterval(function()
        {
          player.horz += playerSpeed;
          check(player);
          player.element.css("left", player.horz+"px");
        }, 1);
      }
      // down
      if (pressed[40] && down)
      {
        down = false;
        intDown = setInterval(function()
        {
          player.vert += playerSpeed;
          check(player);
          player.element.css("top", player.vert+"px");
        }, 1);
      }
    }).keyup(function(e)
    {
      pressed[e.which] = false;
      if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40)
      {
        if (!left && !pressed[37])
        {
          if (intLeft)
          {
            clearInterval(intLeft);
            left = true;
          }
        }
        if (!up && !pressed[38])
        {
          if (intUp)
          {
            clearInterval(intUp);
            up = true;
          }
        }
        if (!right && !pressed[39])
        {
          if (intRight)
          {
            clearInterval(intRight);
            right = true;
          }
        }
        if (!down && !pressed[40])
        {
          if (intDown)
          {
            clearInterval(intDown);
            down = true;
          }
        }
      }
      if (e.which === 32)
      {
        // can only have a max of 10 bombs on screen at once
        if (bombs.length < 3)
        {
          dropBomb();
        }
        else
        {
          bombs[0].remove();
          bombs.shift();
          dropBomb();
        }
      }
    });
  }
  function check(comp)
  {
    if (comp.vert < 0)
    {
      comp.vert = 0;
    }
    else if ((comp.vert + 10) > $("#screen").innerHeight())
    {
      comp.vert = ($("#screen").innerHeight() - 10);
    }
    else if (comp.horz < 0)
    {
      comp.horz = 0;
    }
    else if ((comp.horz + 10) > $("#screen").innerWidth())
    {
      comp.horz = ($("#screen").innerWidth() - 10);
    }
  }
  function moveComp(comp)
  {
    // comp.compInt = setInterval(function()
    // {
      // above player
      if ((comp.vert + 5) < player.vert + 5)
      {
        comp.vert += comp.speed;
        check(comp);
        comp.element.css("top", comp.vert+"px");
      }
      // below player
      else if ((comp.vert + 5) > player.vert + 5)
      {
        comp.vert -= comp.speed;
        check(comp);
        comp.element.css("top", comp.vert+"px");
      }
      // left of player
      if ((comp.horz + 5) < player.horz + 5)
      {
        comp.horz += comp.speed;
        check(comp);
        comp.element.css("left", comp.horz+"px");
      }
      // right of player
      else if ((comp.horz + 5) > player.horz + 5)
      {
        comp.horz -= comp.speed;
        check(comp);
        comp.element.css("left", comp.horz+"px");
      }
    // }, 1);
  }
  function dropBomb()
  {
    var shot = $("<div class='shot'/>");
    $("#screen").append(shot);
    // shot.css({"left":e.pageX, "top":e.pageY});
    // where it drops
    shot.css({"left":player.element.position().left+2, "top":player.element.position().top+2});
    bombs.push(shot);
  }
  function createComp()
  {
    var x;
    var y;
    var spawn = Math.floor(Math.random()*4);
    switch (spawn)
    {
      // top
      case 0:
      {
        x = Math.floor(Math.random()*$("#screen").innerWidth());
        y = 0;
        break;
      }
      // bottom
      case 1:
      {
        x = Math.floor(Math.random()*$("#screen").innerWidth());
        y = $("#screen").innerHeight() - 10;
        break;
      }
      // left
      case 2:
      {
        x = 0
        y = Math.floor(Math.random()*$("#screen").innerHeight());
        break;
      }
      // right
      case 3:
      {
        x = $("#screen").innerWidth() - 10;
        y = Math.floor(Math.random()*$("#screen").innerHeight());
        break;
      }
      default:
      {
        x = 0;
        y = 0;
      }
    }
    var comp = {element:$("<div class='enemy'/>"), vert:y, horz:x, speed:compSpeed};
    enemies.push(comp);
    $("#screen").append(comp.element);
    comp.element.css({"top":y+"px", "left":x+"px"});
    moveComp(comp);
  }
  function collision($div1, $div2)
  {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
  
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
});
