import React, { useEffect } from "react";
import { Container, Content, OpacityContainer } from "./style";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { SideBarList } from "../SideBarList";

const Sidebar = ({ active }) => {
  const router = useRouter();
  const closeSidebar = () => {
    active(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closeSidebar();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, closeSidebar]);

  return (
    <>
      <OpacityContainer onClick={closeSidebar}></OpacityContainer>
      <Container sidebar={active} className={active ? "sidebar" : ""}>
        <Content>
          <SideBarList></SideBarList>
        </Content>
      </Container>
    </>
  );
};

export default Sidebar;
