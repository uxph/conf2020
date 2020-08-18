import React, { useState, useLayoutEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import faq from "../../data/faq.json";

let listCategs = faq.map((query) => query.category);
listCategs = listCategs.filter(
  (categ, index) => listCategs.indexOf(categ) === index
);

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Categories = (props) => {
  const [width, height] = useWindowSize();

  const list = listCategs.map((categ, index) => {
    return (
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === index + 1,
          })}
          onClick={() => {
            props.toggle(index + 1);
          }}
        >
          {categ}
        </NavLink>
      </NavItem>
    );
  });

  if (width > 1000) {
    return (
      <Nav pills vertical>
        {" "}
        {list}{" "}
      </Nav>
    );
  } else {
    return (
      <Nav pills horizontal justified>
        {" "}
        {list}{" "}
      </Nav>
    );
  }
};

const QueryCateg = ({ categ }) => {
  const filterCateg = faq.filter((query) => query.category === categ);
  //console.log(filterCateg);
  const list = filterCateg.map((query, index) => {
    return (
      <div key={index}>
        <h5 className="query-question">{query.question}</h5>
        <p>{query.answer}</p>
      </div>
    );
  });
  return <div>{list}</div>;
};

const Inquiries = () => {
  const [activeTab, setActiveTab] = useState(1);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container className="margin-y-128">
      <Row>
        <Col md={3} className="margin-bottom-32">
          <Categories toggle={toggle} activeTab={activeTab} />
        </Col>
        <Col>
          <TabContent activeTab={activeTab} className="margin-x-16">
            <TabPane tabId={1}>
              <QueryCateg categ="Ticketing System" />
            </TabPane>
            <TabPane tabId={2}>
              <QueryCateg categ="Onlinehustle" />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Inquiries;
