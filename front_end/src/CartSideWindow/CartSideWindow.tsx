import { useState } from "react";
import "./CartSideWindow.css";
import Backdrop from "./Components/Backdrop";
import { SlideDrawer } from "./Components/SlideDrawer";

export function CartSideWindow(props: {
  drawerOpen: boolean;
  setDrawerOpen: Function;
  userDetail: any;
  setItemCount: Function;
  itemCount: number;
}) {
  const { drawerOpen, setDrawerOpen, userDetail, setItemCount, itemCount } = {
    ...props,
  };

  function handleBackdropClick() {
    setDrawerOpen(false);
  }

  return (
    <div>
      <SlideDrawer
        show={drawerOpen}
        userDetails={userDetail}
        itemCount={itemCount}
        setItemCount={setItemCount}
      />
      {drawerOpen && <Backdrop closeDrawer={handleBackdropClick} />}
    </div>
  );
}
