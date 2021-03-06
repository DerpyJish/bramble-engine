// STANDARD COMPONENTS //

// Position component
// Used to store the position of an entity as a vector
class PositionComp extends Component {
  constructor( x , y ) {
    super( "position" );
    this.vec = new Vec( x , y );
  }

  get x() { return this.vec.x }
  get y() { return this.vec.y }
  set x(v) { this.vec.x = v }
  set y(v) { this.vec.y = v }
}
