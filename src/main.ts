 let black = -1; // computer is black
 let red = 1; // visitor is red
 let square_dim = 35;
 let piece_toggled = false;
 let my_turn = false;
 let double_jump = false;
 let comp_move = false;
 let game_is_over = false;
 let safe_from = null;
 let safe_to = null;
 let toggler = null;
 let togglers = 0;
 let selected;
 let selected_c;
 
 function Board() {
  board = new Array();
  for (var i=0;i<8; i++) {
   board[i] = new Array();
   for (var j=0;j<8;j++)
    board[i][j] = Board.arguments[8*j+i];
  }
  board[-2] = new Array(); // prevents errors
  board[-1] = new Array(); // prevents errors
  board[8] = new Array(); // prevents errors
  board[9] = new Array(); // prevents errors
 }
 var board;
 Board(1,0,1,0,1,0,1,0,
       0,1,0,1,0,1,0,1,
       1,0,1,0,1,0,1,0,
       0,0,0,0,0,0,0,0,
       0,0,0,0,0,0,0,0,
       0,-1,0,-1,0,-1,0,-1,
       -1,0,-1,0,-1,0,-1,0,
       0,-1,0,-1,0,-1,0,-1);
 
 
 function moveable_space(i:number ,j: number) {
  // calculates whether it is a gray (moveable)
  // or black (non-moveable) space
  return (((i%2)+j)%2 == 0);
 }
 function Coord(x:number ,y: number) {
  this.x = x;
  this.y = y;
 }
 function coord(x ,y){
  let c = new Coord(x,y);
  return c;
 }
 
 /*let titre = React.createElement('h3', {}, 'Jeu de Dame');
 let sous_titre = React.createElement('h4', {}, 'menbre du groupe');
 let div = React.createElement('div', {}, titre,);*/
 function plateau (){
  document.write('<div class="intro">  <h1>Jeu de Dame</h1> <h2> Membre du groupe </h2> <ul> <li>DONGMO Raymond Lionel IMTICIA 5 N°08 </li> <li> RASOAHARINIRINA Fanomezantsoa Sidonie IMTICIA 5 N°06</li> <li>TANJONA Fetrasoa IMTICIA 5 N°14 </li> <li>DONTSOP L.L. Hermann ESIIA 5 N°01</li> <li> ANDRIANTSOA Herifitia Manda IMTICIA 5 N°09 </li> </ul> </div>');
  document.write('<div class="jeux">');
  document.write("<table border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8)
  +"<tr><td><img src='images/black.gif' width="+(square_dim*8+8)
  +" height=4><br></td></tr>");
  for(var j=0;j<8;j++) {
    document.write("<tr><td><img src='images/black.gif' width=4 height="+square_dim+">");
    for(var i=0;i<8;i++) {
      if (moveable_space(i,j))
          document.write("<a href='javascript:clicked("+i+","+j+")'>");
      
      document.write("<img src='images/");
      if (board[i][j]==1) document.write("you1.gif");
      else if (board[i][j]==-1) document.write("me1.gif");
      else if (moveable_space(i,j)) document.write("gray.gif");
      else document.write("black.gif");
      document.write("' width="+square_dim+" height="+square_dim
          +" name='space"+i+""+j+"' border=0>");
      if (moveable_space(i,j)) document.write("</a>");
    }
    document.write("<img src='images/black.gif' width=4 height="+square_dim+"></td></tr>");
  }
  document.write("<tr><td><img src='images/black.gif' width="+(square_dim*8+8)
  +" height=4><br></td></tr></table><br>"
  +"<form name='disp'><textarea id='msg' name='message' wrap=virtual rows=3 cols=40></textarea><br><input "
  +"type=button value=\"Red&eacute;marrer le jeu\" onClick=\"location.href+=''\"></form>");
  document.write('</div>');
}
 
 function clicked(i:number, j:number) {
  if (my_turn) {
   if (integ(board[i][j])==1) toggle(i,j);
   else if (piece_toggled) move(selected,coord(i,j));
   else document.querySelector('#msg').textContent  = "Cliquez d'abord sur l'un de vos pions (les rouges), puis cliquez sur la case vers laquelle vous voulez le déplacer.";
  } else {
    document.querySelector('#msg').textContent  = "Ce n'est pas encore votre tour... Attendez une seconde!";
  }
 }
 function toggle(x:number, y:number) {
  if (my_turn) {
   if (piece_toggled)
    draw(selected.x,selected.y,"images/you1"+((board[selected.x][selected.y]==1.1)?"k":"")+".gif");
   if (piece_toggled && (selected.x == x) && (selected.y == y)) {
    piece_toggled = false;
    if (double_jump) { my_turn = double_jump = false; computer(); }
   } else {
    piece_toggled = true;
    draw(x,y,"images/you2"+((board[x][y]==1.1)?"k":"")+".gif");
   }
   selected = coord(x,y);
  } else {
   if ((piece_toggled) && (integ(board[selected_c.x][selected_c.y])==-1))
    draw(selected_c.x,selected_c.y,"images/me1"+((board[selected_c.x][selected_c.y]==-1.1)?"k":"")+".gif");
   if (piece_toggled && (selected_c.x == x) && (selected_c.y == y)) {
    piece_toggled = false;
   } else {
    piece_toggled = true;
    draw(x,y,"images/me2"+((board[x][y]==-1.1)?"k":"")+".gif");
   }
   selected_c = coord(x,y);
  }
 }
 function draw(x:number, y:number, name: string) {
  document.images["space"+x+""+y].src = name;
 }
 function integ(num: number): number {
  if (num != null)
   return Math.round(num);
  else
   return null;
 }
 function abs(num:number) {
  return Math.abs(num);
 }
 function sign(num:number): number {
  if (num < 0) return -1;
  else return 1;
 }
 function concatenate(arr1:string[], arr2:string[]) {
  // function tacks the second array onto the end of the first and returns result
  for(var i=0;i<arr2.length;i++)
   arr1[arr1.length+i] = arr2[i];
  return arr1;
 }
 function legal_move(from,to): boolean {
  if ((to.x < 0) || (to.y < 0) || (to.x > 7) || (to.y > 7)) return false;
  let piece = board[from.x][from.y];
  let distance = coord(to.x-from.x,to.y-from.y);
  if ((distance.x == 0) || (distance.y == 0)) {
    document.querySelector('#msg').textContent  = "You may only move diagonally.";
   return false;
  }
  if (abs(distance.x) != abs(distance.y)) {
    document.querySelector('#msg').textContent  = "Invalid move.";
   return false;
  }
  if (abs(distance.x) > 2) {
     document.querySelector('#msg').textContent  ="Invalid move.";
   return false;
  }
  if ((abs(distance.x) == 1) && double_jump) {
   return false;
  }
  if ((board[to.x][to.y] != 0) || (piece == 0)) {
   return false;
  }
  if ((abs(distance.x) == 2)
  && (integ(piece) != -integ(board[from.x+sign(distance.x)][from.y+sign(distance.y)]))) {
   return false;
  }
  if ((integ(piece) == piece) && (sign(piece) != sign(distance.y))) {
   return false;
  }
  
  return true;
 }
 function move(from,to): boolean {
  my_turn = true;
  if (legal_move(from,to)) {
   let piece = board[from.x][from.y];
   let distance = coord(to.x-from.x,to.y-from.y);
   if ((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
    swap(from,to);
   } else if ((abs(distance.x) == 2)
   && (integ(piece) != integ(board[from.x+sign(distance.x)][from.y+sign(distance.y)]))) {
    double_jump = false;
    swap(from,to);
    remove(from.x+sign(distance.x),from.y+sign(distance.y));
    if ((legal_move(to,coord(to.x+2,to.y+2)))
    || (legal_move(to,coord(to.x+2,to.y-2)))
    || (legal_move(to,coord(to.x-2,to.y-2)))
    || (legal_move(to,coord(to.x-2,to.y+2)))) {
     double_jump = true;
     document.querySelector('#msg').textContent  = "Vous devez terminer votre double saut ou cliquer sur votre pièce pour laisser votre pion à l'endroit auquel il se trouve.";
    }
   }
   if ((board[to.x][to.y] == 1) && (to.y == 7)) king_me(to.x,to.y);
   selected = to;
   if (game_over() && !double_jump) {
    setTimeout("toggle("+to.x+","+to.y+");my_turn = double_jump = false;computer();",1000);
   }
  }
  return true;
 }

 function king_me(x:number ,y:number) {
  if (board[x][y] == 1) {
   board[x][y] = 1.1; // king you
   draw(x,y,"you2k.gif");
  } else if (board[x][y] == -1) {
   board[x][y] = -1.1; // king me
   draw(x,y,"me2k.gif");
  }
 }
 
 function swap(from,to) {
  if (my_turn || comp_move) {
   let dummy_src = document.images["space"+to.x+""+to.y].src;
   document.images["space"+to.x+""+to.y].src = document.images["space"+from.x+""+from.y].src;
   document.images["space"+from.x+""+from.y].src = dummy_src;
  }
  let dummy_num = board[from.x][from.y];
  board[from.x][from.y] = board[to.x][to.y];
  board[to.x][to.y] = dummy_num;
 }

 function remove(x:number, y:number) {
  if (my_turn || comp_move)
   draw(x,y,"images/gray.gif");
  board[x][y] = 0;
 }

 function Result(val:number) {
  this.high = val;
  this.dir = new Array();
 }

 function move_comp(from,to): boolean {
  toggle(from.x,from.y);
  comp_move = true;
  swap(from,to);
  if (abs(from.x-to.x) == 2) {
   remove(from.x+sign(to.x-from.x),from.y+sign(to.y-from.y));
  }
  if ((board[to.x][to.y] == -1) && (to.y == 0)) king_me(to.x,to.y);
  setTimeout("selected_c = coord("+to.x+","+to.y+");piece_toggled = true;",900);
  setTimeout("bak=my_turn;my_turn=false;toggle("+to.x+","+to.y+");my_turn=bak;",1000);
  if (game_over()) {
   setTimeout("comp_move = false;my_turn = true;togglers=0;",600);
   document.querySelector('#msg').textContent  = "Ok. C'est votre tour. Vous devez effectuer un déplacement.";
  }
  return true;
 }

 function game_over() { // make sure game is not over (return false if game is over)
  let comp = false;
  let you =  false;
  for(var i=0;i<8;i++) {
   for(var j=0;j<8;j++) {
    if(integ(board[i][j]) == -1) comp = true;
    if(integ(board[i][j]) == 1) you = true;
   }
  }
  if (!comp) document.querySelector('#msg').textContent  = "Tu as gagné!";
  if (!you) document.querySelector('#msg').textContent  ="Arg! Game over.";
  game_is_over = (!comp || !you)
  return (!game_is_over);
 }
 
 // the higher the jump_priority, the more often the computer will take the jump over the safe move
 var jump_priority = 10;
 
 function computer(): boolean {
  // step one - prevent any jumps
  for(var j=0;j<8;j++) {
   for(var i=0;i<8;i++) {
    if (integ(board[i][j]) == 1) {
     if ((legal_move(coord(i,j),coord(i+2,j+2))) && (prevent(coord(i+2,j+2),coord(i+1,j+1)))) {
      return true;
     } if ((legal_move(coord(i,j),coord(i-2,j+2))) && (prevent(coord(i-2,j+2),coord(i-1,j+1)))) {
      return true;
     }
    } if (board[i][j] == 1.1) {
     if ((legal_move(coord(i,j),coord(i-2,j-2))) && (prevent(coord(i-2,j-2),coord(i-1,j-1)))) {
      return true;
     } if ((legal_move(coord(i,j),coord(i+2,j-2))) && (prevent(coord(i+2,j-2),coord(i+1,j-1)))) {
      return true;
     }
    }
   }
  }
  // step two - if step one not taken, look for jumps
  for(var j=7;j>=0;j--) {
   for(var i=0;i<8;i++) {
    if (jump(i,j))
     return true;
   }
  }
  safe_from = null;
  // step three - if step two not taken, look for safe single space moves
  for(var j=0;j<8;j++) {
   for(var i=0;i<8;i++) {
    if (single(i,j))
     return true;
   }
  }
  // if no safe moves, just take whatever you can get
  if (safe_from != null) {
   move_comp(safe_from,safe_to);
  } else {
    document.querySelector('#msg').textContent  ="Vous avez gagné!!";
   game_is_over = true;
  }
  safe_from = safe_to = null;
  return false;
 }

 function jump(i:number, j:number): boolean {
  if (board[i][j] == -1.1) {  
   if (legal_move(coord(i,j),coord(i+2,j+2))) {
    move_comp(coord(i,j),coord(i+2,j+2));
    setTimeout("jump("+(i+2)+","+(j+2)+");",500);
    return true;
   } if (legal_move(coord(i,j),coord(i-2,j+2))) {
    move_comp(coord(i,j),coord(i-2,j+2));
    setTimeout("jump("+(i-2)+","+(j+2)+");",500);
    return true;
   }
  } if (integ(board[i][j]) == -1) {
   if (legal_move(coord(i,j),coord(i-2,j-2))) {
    move_comp(coord(i,j),coord(i-2,j-2));
    setTimeout("jump("+(i-2)+","+(j-2)+");",500);
    return true;
   } if (legal_move(coord(i,j),coord(i+2,j-2))) {
    move_comp(coord(i,j),coord(i+2,j-2));
    setTimeout("jump("+(i+2)+","+(j-2)+");",500);
    return true;
   }
  }
  return false;
 }

 function single(i:number, j:number) :boolean {
  if (board[i][j] == -1.1) {
   if (legal_move(coord(i,j),coord(i+1,j+1))) {
    safe_from = coord(i,j);
    safe_to = coord(i+1,j+1);
    if (wise(coord(i,j),coord(i+1,j+1))) {
     move_comp(coord(i,j),coord(i+1,j+1));
     return true;
    }
   } if (legal_move(coord(i,j),coord(i-1,j+1))) {
    safe_from = coord(i,j);
    safe_to = coord(i-1,j+1);
    if (wise(coord(i,j),coord(i-1,j+1))) {
     move_comp(coord(i,j),coord(i-1,j+1));
     return true;
    }
   }
  } if (integ(board[i][j]) == -1) {
   if (legal_move(coord(i,j),coord(i+1,j-1))) {
    safe_from = coord(i,j);
    safe_to = coord(i+1,j-1);
    if (wise(coord(i,j),coord(i+1,j-1))) {
     move_comp(coord(i,j),coord(i+1,j-1));
     return true;
    }
   } if (legal_move(coord(i,j),coord(i-1,j-1))) {
    safe_from = coord(i,j);
    safe_to = coord(i-1,j-1);
    if (wise(coord(i,j),coord(i-1,j-1))) {
     move_comp(coord(i,j),coord(i-1,j-1));
     return true;
    }
   }
  }
  return false;
 }

 function possibilities(x:number, y:number):boolean {
  if (!jump(x,y))
   if (!single(x,y))
    return true;
   else
    return false;
  else
   return false;
 }

 function prevent(end,s) : boolean {
  let i = end.x;
  let j = end.y;
  if (!possibilities(s.x,s.y))
   return true;
  else if ((integ(board[i-1][j+1])==-1) && (legal_move(coord(i-1,j+1),coord(i,j)))) {
    return move_comp(coord(i-1,j+1),coord(i,j));
  } else if ((integ(board[i+1][j+1])==-1) && (legal_move(coord(i+1,j+1),coord(i,j)))) {
    return move_comp(coord(i+1,j+1),coord(i,j));
  } else if ((board[i-1][j-1]==-1.1) && (legal_move(coord(i-1,j-1),coord(i,j)))) {
    return move_comp(coord(i-1,j-1),coord(i,j));
  } else if ((board[i+1][j-1]==-1.1) && (legal_move(coord(i+1,j-1),coord(i,j)))) {
    return move_comp(coord(i+1,j-1),coord(i,j));
  } else {
   return false;
  }
 }

 function wise(from,to) :boolean {
  let i = to.x;
  let j = to.y;
  let n = (j>0);
  let s = (j<7);
  let e = (i<7);
  let w = (i>0);
  let ne : number;
  let nw :number;
  let se :number;
  let sw :number;
  if (n&&e) ne = board[i+1][j-1]; else ne = null;
  if (n&&w) nw = board[i-1][j-1]; else nw = null;
  if (s&&e) se = board[i+1][j+1]; else se = null;
  if (s&&w) sw = board[i-1][j+1]; else sw = null;
  eval(((j-from.y != 1)?"s":"n")+((i-from.x != 1)?"e":"w")+"=0;");
  if ((sw==0) && (integ(ne)==1)) return false;
  if ((se==0) && (integ(nw)==1)) return false;
  if ((nw==0) && (se==1.1)) return false;
  if ((ne==0) && (sw==1.1)) return false;
  return true;
 }
   
 my_turn = true;

function render(){
  ReactDOM.render(plateau(), document.querySelector('#app'));
}
render();

 