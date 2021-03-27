
/*
///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//                                Piece encoding                                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//  emSq, P+, P-, K, N, B, R, Q                      0  0  0    0  0  0  0       //
//     0,  1,  2, 3, 4, 5, 6, 7                     64 32 16    8  4  2  1       //
//                                                                               //
//  w = 8  b = 16                                                                //
//                                                                               //
//  wP : P+ | w = 9     0001 | 1000 = 1001           1 & 1 = 1   bitwise AND     //
//  wK :  K | w = 11    0011 | 1000 = 1011           1 & 0 = 0                   //
//  wN :  N | w = 12    0100 | 1000 = 1100           0 & 1 = 0                   //
//  wB :  B | w = 13    0101 | 1000 = 1101           0 & 0 = 0                   //
//  wR :  R | w = 14    0110 | 1000 = 1110                                       //
//  wQ :  Q | w = 15    0111 | 1000 = 1111           1 | 1 = 1   bitwise OR      //
//                                                   1 | 0 = 1                   //
//  bP : P- | b = 18    00010 | 10000 = 10010        0 | 1 = 1                   //
//  bK :  K | b = 19    00011 | 10000 = 10011        0 | 0 = 0                   //
//  bN :  N | b = 20    00100 | 10000 = 10100                                    //
//  bB :  B | b = 21    00101 | 10000 = 10101                                    //
//  bR :  R | b = 22    00110 | 10000 = 10110                                    //
//  bQ :  Q | b = 23    00111 | 10000 = 10111                                    //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

// 0x88 board + positional scores
var board = [

    22, 20, 21, 23, 19, 21, 20, 22,    0,  0,  5,  5,  0,  0,  5,  0, 
    18, 18, 18, 18, 18, 18, 18, 18,    5,  5,  0,  0,  0,  0,  5,  5,
     0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,    
     0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
     9,  9,  9,  9,  9,  9,  9,  9,    5,  5,  0,  0,  0,  0,  5,  5,
    14, 12, 13, 15, 11, 13, 12, 14,    0,  0,  5,  5,  0,  0,  5,  0

];

var coordinates = [                                          // convert square id to board notation

    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",     "i8","j8","k8","l8","m8","n8","o8", "p8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",     "i7","j7","k7","l7","m7","n7","o7", "p7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",     "i6","j6","k6","l6","m6","n6","o6", "p6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",     "i5","j5","k5","l5","m5","n5","o5", "p5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",     "i4","j4","k4","l4","m4","n4","o4", "p4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",     "i3","j3","k3","l3","m3","n3","o3", "p3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",     "i2","j2","k2","l2","m2","n2","o2", "p2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",     "i1","j1","k1","l1","m1","n1","o1", "p1",

];

// Relative values to evaluate the material score of the position.

/* 
    Piece weights array map:
    
        empty square,
        skip 2nd,
        black pawn,
        black king = 0,    for kings are not evaluated, only king captures
        black knight,
        black bishop,
        black rook,
        black queen,
        skip 9th,
        white pawn,
        skip 11th,
        white king = 0,    for kings are not evaluated, only king captures
        white knight,
        white bishop,
        white rook,
        white queen
*/
/*
// print unicode characters to represent pieces on board
var pieces = [

  ".", "-", "\u265F", "\u265A", "\u265E", "\u265D", "\u265C", "\u265B", 
  "-", "\u2659", "-", "\u2654", "\u2658", "\u2657", "\u2656", "\u2655",  

];

// relative piece weights
var piece_weights = [0, 0, -100, 0, -300, -350, -500, -900, 0, 100, 0, 0, 300, 350, 500, 900];

// piece move offsets
var move_offsets = [

   15,  16,  17,   0,                           // black pawns
  -15, -16, -17,   0,                           // white pawns
    1,  16,  -1, -16,   0,                      // rooks
    1,  16,  -1, -16,  15, -15, 17, -17,  0,    // queens, kings and bishops
   14, -14,  18, -18,  31, -31, 33, -33,  0,    // knights
    3,  -1,  12,  21,  16,   7, 12              /* starting indexes for each piece type in order:
                                                   black pawns, white pawns, kings, knights, bishops, rooks, queens
                                                   
                                                   e.g. piece type is 4 - knight
                                                   move_offset[30] == 0
                                                   move_offset[from 31 to 37] == 3, -1, 12, 21, 16, 7, 12
                                                   so move_offset[30 + type(which is 4 in case of knight)] is 34,
                                                   so at move_offset[34] value is 21 - this is the index where knight
                                                   offsets are starting, so we can loop over knight move offests to
                                                   generate knight moves.
                                                   
                                                */
/*];

// color constants
WHITE = 8;
BLACK = 16;

// side to move
var side = WHITE;

// to store the best move found in search
var best_source, best_target;

// search board position for the best move
function search_position(side, depth, alpha, beta)
{
  // we are in the leaf node
  if (depth == 0)
  {
    // static evaluation score
    var score = 0;

    // loop over board square
    for (var square = 0; square < 128; square++)
    {
      // make sure square is on board
      if ((square & 0x88) == 0)
      {
        // init piece
        piece = board[square]
        
        // make sure piece is available
        if (piece)
        {
          // calculate material score
          score += piece_weights[piece & 15];
          
          // calculate positional score
          (piece & WHITE) ? (score += board[square + 8]) : (score -= board[square + 8]);
        }
      }
    }

    // return positive score for white and negative for black
    return (side == WHITE) ? score: -score;
  }

  var old_alpha = alpha;       // needed to check whether to store best move or not
  var temp_source;             // temorary best from square
  var temp_target;             // temporary best to square
  var score = -10000;          // minus infinity

  // move generator variables
  var piece, piece_type, directions, source_square, target_square, captured_square, captured_piece, step_vector;
  
  // loop over board squares
  for (var square = 0; square < 128; square++)
  {
    // make sure that square is on board
    if ((square & 0x88) == 0)
    {
      // init source square
      source_square = square
    
      // init piece to move
      piece = board[square];
      
      // make sure piece belongs to the side to move
      if (piece & side)
      {
        // extract piece type
        piece_type = piece & 7;
        
        // init directions
        directions = move_offsets[piece_type + 30];
        //console.log(pieces[piece & 15] + ' ' + directions);
        
        // loop over piece move directions
        while(step_vector = move_offsets[++directions])    // loop over move offsets
        {
          // init target square
          target_square = source_square;
          
          // loop over squares within a given move direction ray
          do
          {
            // init next target square within move direction ray
            target_square += step_vector;
            
            // init captured piece
            captured_square = target_square;
            
            // drop sliding if hit the edge of the board
            if(target_square & 0x88) break;
            
            // init captured piece
            captured_piece = board[captured_square];
            
            // break if captured own piece
            if(captured_piece & side) break;
            
            // pawns captures only diagonally
            if(piece_type < 3 && !(step_vector & 7) != !captured_piece) break;
            
            // return mating score if king has been captured
            if((captured_piece & 7) == 3) return 10000;
            
            // make move
            board[captured_square] = 0;       // clear captured square
            board[source_square] = 0;         // clear source square (from square where piece was)
            board[target_square] = piece;     // put piece to destination square (to square)

            // pawn promotion
            if(piece_type < 3)    // if pawn
            {
                if(target_square + step_vector + 1 & 0x80)    // goes to the 1th/8th rank
                    board[target_square] |= 7;                // convert it to queen
            }

            // recursive negamax search call
            score = -search_position(24 - side, depth - 1, -beta, -alpha);    // recursive negamax search call

            // take back
            board[target_square] = 0;                   // clear the destination square (to square)
            board[source_square] = piece;               // put the piece back to it's original square (from square)
            board[captured_square] = captured_piece;    // restore captured piece on source square if any
            
            //Needed to detect checkmate
            best_source = source_square;
            best_target = target_square;
            
            // PV node
            if(score > alpha)
            {
              // fail-high node
              if(score >= beta)
                return beta;    // beta cutoff
              
              // update alpha value
              alpha = score;

              // save best move in given branch
              temp_source = source_square;
              temp_target = target_square;
            }        
            
            // fake capture for non-slider pieces
            captured_piece += piece_type < 5;
            
            // unfake capture for pawns if double pawn push is on the cards
            if(piece_type < 3 & 6*side + (target_square & 0x70) == 0x80) captured_piece--;
          }
          
          // condition to break out of loop over squares for non-slider pieces
          while(captured_piece == 0)
        }
      }
    }
  }
  
  // store the best move
  if(alpha != old_alpha)
  {
      best_source = temp_source;
      best_target = temp_target;
  }

  // fail-low node
  return alpha;
}

// print board
function print_board()
{
  // init board string
  var board_string = '';

  // loop over board rows
  for (var row = 0; row < 8; row++)
  {
    // loop over board columns
    for (var col = 0; col < 16; col++)
    {
      // convert row and column to board square
      var square = row * 16 + col;
      
      // make sure square is in board
      if ((square & 0x88) == 0)
        // update board string with pieces
        board_string += pieces[board[square] & 15] + ' ';
    }
    
    // append new line charecter to board string
    board_string += '\n'
  }
  
  // print board
  console.log(board_string);
}

function draw_board(){
  // create HTML rable tag
  var chess_board = '<table align="center" cellspacing="0">';
  
  // loop over board rows
  for (var row = 0; row < 8; row++)
  {
    // create table row
    chess_board += '<tr>'
    
    // loop over board columns
    for (var col = 0; col < 16; col++)
    {
      // init square
      var square = row * 16 + col;
      
      // make sure square is on board
      if ((square & 0x88) == 0)
        // create table cell
        chess_board += '<td align="center" id="' + square + '"bgcolor="#' + ( ((col + row) % 2) ? 'aaa' : 'eee') + '" width="60" height="60" style="font-size: 50px;" onclick="make_move(this.id)"></td>'
    }
    
    // close table row tag
    chess_board += '</tr>'
  }
  
  // close div tag
  chess_board += '</table>';
  
  // render chess board to screen
  document.write(chess_board);
}

// update board position (draw pieces)
function update_board()
{
  // loop over board rows
  for (var row = 0; row < 8; row++)
  {
    // loop over board columns
    for (var col = 0; col < 16; col++)
    {
      // int square
      var square = row * 16 + col;
      
      // make sure square is on board
      if ((square & 0x88) == 0)
        // draw pieces
        document.getElementById(square).innerHTML = pieces[board[square] & 15].replace('.', '');
    }
  }
}

// variable to check click-on-piece state
var click_lock = false;

// user input variables
var user_source, user_target;

// default search depth
var search_depth = 3;

function make_move(sq) {
  // convert div ID to square index
  var click_sq = parseInt(sq, 10)
  
  // if user clicks on source square 
  if(!click_lock && board[click_sq]){
    // highlight clicked square
    document.getElementById(sq).style.backgroundColor = '#fff';
    
    // init user source square
    user_source = click_sq;
    
    // lock click
    click_lock ^= 1;
  }
  
  // if user clicks on destination square
  else if(click_lock){
    // extract row and column from target square
    var col = user_source & 7;
    var row = user_source >> 4;
    
    // restore color of the square that piece has left
    var color = (col + row) % 2 ? 'aaa' : 'eee'
    document.getElementById(user_source).style.backgroundColor = '#' + color;
    
    // move piece
    board[click_sq] = board[user_source];
    board[user_source] = 0;
    
    // if pawn promotion
    if(((board[click_sq] == 9) && (click_sq >= 0 && click_sq <= 7)) ||
       ((board[click_sq] == 18) && (click_sq >= 112 && click_sq <= 119)))
        board[click_sq] |= 7;    // convert pawn to corresponding side's queen
    
    // change side
    side = 24 - side;
    
    // unlock click
    click_lock ^= 1;
    
    // update position
    update_board();
    
    // make computer move in response
    setTimeout("think(search_depth)", 100);
  }
}

function think(depth){
  // search position
  var score = search_position(side, depth, -10000, 10000);
  
  // make AI move
  board[best_target] = board[best_source];
  board[best_source] = 0;
  
  // if pawn promotion
  if(((board[best_target] == 9) && (best_target >= 0 && best_target <= 7)) ||
     ((board[best_target] == 18) && (best_target >= 112 && best_target <= 119)))
      board[best_target] |= 7;    // convert pawn to corresponding side's queen
  
  // change side
  side = 24 - side;
  
  // Checkmate detection
  if(score == 10000){
    update_board();
    setTimeout(
      function(){
        alert("White is checkmated!");
        location.reload();
      }, 100);
  }
  
  else if(score == -10000){
    setTimeout(
      function(){
        alert("Black is checkmated!");
        location.reload();
      }, 100);
  }
  
  else {
    update_board();
  }
  
  // log stats
  print_board();
  console.log('score: ', score);
  console.log('move: ', coordinates[best_source] + coordinates[best_target]);
  
}

// render board
draw_board();

// update board position
update_board();
*/
