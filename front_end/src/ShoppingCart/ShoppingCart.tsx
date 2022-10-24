import "./ShoppingCart.css";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";

export function ShoppingCart(props: {
  numberOfItemsInCart: number;
  setDrawerOpen: Function;
  drawerOpen: boolean;
  userDetails: any;
}) {
  const { numberOfItemsInCart, setDrawerOpen, drawerOpen } = { ...props };

  return (
    <div>
      <div className="shoppingCartDiv">
        <Button
          onClick={() => {
            // setItemCount(Math.max(itemCount - 1, 0));
            //open cartSideWindow and fetch games for a  specific user
            setDrawerOpen(!drawerOpen);
          }}
        >
          <Badge
            overlap="rectangular"
            color="secondary"
            badgeContent={numberOfItemsInCart}
          >
            <ShoppingCartIcon />
          </Badge>
          CART
        </Button>
      </div>
    </div>
  );
}
