import { Figure, FigureNames } from "./Figure";
import{ Colors } from "../Colors";
import{ Cell } from "../Cell";
import blackLogo from '../../assets/black-king.png' ;
import whiteLogo from '../../assets/white-king.png' ;


export class King extends Figure {

    isFirstStap:boolean = true;

    constructor (color:Colors, cell:Cell){
        super(color,cell);
        this.logo= color === Colors.BLACK? blackLogo:whiteLogo;
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
           return false;
        const direction = this.cell.figure?.color === Colors.BLACK? 1:-1
        if((target.x === this.cell.x + direction || target.y === this.cell.y + direction
            && (target.y === this.cell.y || target.x === this.cell.x ))
           && (target.x === this.cell.x ||target.y === this.cell.y)
           || (target.x === this.cell.x - direction || target.y === this.cell.y - direction
            && (target.y === this.cell.y || target.x === this.cell.x ))
            && (target.y === this.cell.y ||target.x === this.cell.x)
           && this.cell.board.getCell(target.x, target.y).isEmpty()) {
        return true;
    }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)
       return (dx === 1 && dy === 1);     
    }
}