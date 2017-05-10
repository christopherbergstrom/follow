var pressed= [];
var up = true;
var down = true;
var left = true;
var right = true;
var intUp;
var intDown;
var intLeft;
var intRight;
var player;
var playerSpeed = 1;
var vert = 0;
var horz = 0;
var comp;
var compInt;
var compSpeed = 1;
var compVert = 10;
var compHorz = 0;
$(document).ready(function()
{
  $("#screen").append("<div id='player'/>");
  player = $("#player");
  $("#screen").append("<div class='enemy'/>");
  comp = $(".enemy");
  movePlayer();
  moveComp();
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
          horz -= playerSpeed;
          playerCheck();
          player.css("left", horz+"px");
        }, 1);
      }
      // up
      if (pressed[38] && up)
      {
        up = false;
        intUp = setInterval(function()
        {
          vert -= playerSpeed;
          playerCheck();
          player.css("top", vert+"px");
        }, 1);
      }
      // right
      if (pressed[39] && right)
      {
        right = false;
        intRight = setInterval(function()
        {
          horz += playerSpeed;
          playerCheck();
          player.css("left", horz+"px");
        }, 1);
      }
      // down
      else if (pressed[40] && down)
      {
        down = false;
        intDown = setInterval(function()
        {
          vert += playerSpeed;
          playerCheck();
          player.css("top", vert+"px");
        }, 1);
      }
    }).keyup(function(e)
    {
      pressed[e.which] = false;
      if (e.which == 37 || e.which == 38 || e.which == 39 ||e.which == 40)
      {
        if (!left && !pressed[37])
        {
          if (intLeft)
          {
            clearInterval(intLeft);
            left = true;
          }
        }
        else if (!up && !pressed[38])
        {
          if (intUp)
          {
            clearInterval(intUp);
            up = true;
          }
        }
        else if (!right && !pressed[39])
        {
          if (intRight)
          {
            clearInterval(intRight);
            right = true;
          }
        }
        else if (!down && !pressed[40])
        {
          if (intDown)
          {
            clearInterval(intDown);
            down = true;
          }
        }
      }
    });
  }
  function playerCheck()
  {
    if(vert < 0)
    {
      vert = 0;
    }
    else if ((vert + 10) > $("#screen").innerHeight())
    {
      vert = ($("#screen").innerHeight() - 10);
    }
    else if (horz < 0)
    {
      horz = 0;
    }
    else if ((horz + 10) > $("#screen").innerWidth())
    {
      horz = ($("#screen").innerWidth() - 10);
    }
  }
  function compCheck()
  {
    console.log("in compCheck");
    if (compVert < 0)
    {
      compVert = 0;
    }
    else if ((compVert + 10) > $("#screen").innerHeight())
    {
      compVert = ($("#screen").innerHeight() - 10);
    }
    else if (compHorz < 0)
    {
      compHorz = 0;
    }
    else if ((compHorz + 10) > $("#screen").innerWidth())
    {
      compHorz = ($("#screen").innerWidth() - 10);
    }
  }
  function moveComp()
  {
    console.log("in moveComp");
    compInt = setInterval(function()
    {
      // console.log("in compInt");
      // above player
      if ((compVert) < vert)
      {
        compVert += compSpeed;
        compCheck();
        comp.css("top", compVert+"px");
      }
      // below player
      else if ((compVert) > vert)
      {
        compVert -= compSpeed;
        compCheck();
        comp.css("top", compVert+"px");
      }
      // left of player
      else if ((compHorz) < horz)
      {
        compHorz += compSpeed;
        compCheck();
        comp.css("left", compHorz+"px");
      }
      // right of player
      else if ((compHorz) > horz)
      {
        compHorz -= compSpeed;
        compCheck();
        comp.css("left", compHorz+"px");
      }
      // else
      // {
      //   console.log("in else");
      // }
    }, 1);
  }
});