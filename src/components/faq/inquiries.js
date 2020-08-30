import React from "react";
// import {
//   TabContent,
//   TabPane,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import classnames from "classnames";
import faq from "../../data/faq.json";
import { Row, Col } from "reactstrap";

// let listCategs = faq.map((query) => query.category);
// listCategs = listCategs.filter(
//   (categ, index) => listCategs.indexOf(categ) === index
// );

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener("resize", updateSize);
//     updateSize();
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);
//   return size;
// }

// const Categories = (props) => {
//   const [width] = useWindowSize();

//   const list = listCategs.map((categ, index) => {
//     return (
//       <NavItem
//         className="margin-bottom-12"
//         style={{
//           cursor: "pointer",
//         }}
//       >
//         <NavLink
//           className={classnames({
//             active: props.activeTab === index + 1,
//           })}
//           onClick={() => {
//             props.toggle(index + 1);
//           }}
//         >
//           {categ}
//         </NavLink>
//       </NavItem>
//     );
//   });

//   if (width > 1000) {
//     return (
//       <Nav pills vertical>
//         {" "}
//         {list}{" "}
//       </Nav>
//     );
//   } else {
//     return (
//       <Nav pills horizontal justified>
//         {" "}
//         {list}{" "}
//       </Nav>
//     );
//   }
// };

// const QueryCateg = ({ categ }) => {
//   const filterCateg = faq.filter((query) => query.category === categ);
//   //console.log(filterCateg);
//   const list = filterCateg.map((query, index) => {
//     return (
//       <div key={index} className="margin-bottom-48">
//         <h5 className="query-question">{query.question}</h5>
//         <p>{query.answer}</p>
//       </div>
//     );
//   });
//   return <div>{list}</div>;
// };

// const OldInquiries = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   return (
//     <Container className="margin-y-96">
//       <Row>
//         <Col md={3} className="margin-bottom-32">
//           <Categories toggle={toggle} activeTab={activeTab} />
//         </Col>
//         <Col md={8}>
//           <TabContent activeTab={activeTab} className="margin-x-16">
//             <TabPane tabId={1}>
//               <QueryCateg categ="Ticketing System" />
//             </TabPane>
//             <TabPane tabId={2}>
//               <QueryCateg categ="Onlinehustle" />
//             </TabPane>
//           </TabContent>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

const Inquiries = () => {
  const faq_items = faq.map((item, index) => (
    <Col sm={12} md={6} key={index}>
      <div className="margin-bottom-64">
        <h3 className="font-size-24">{item.question}</h3>
        <p className="gray">{item.answer}</p>
      </div>
    </Col>
  ));
  return (
    <section className="padding-y-64">
      <div className="wrapper">
        <Row>{faq_items}</Row>
      </div>
    </section>
  );
};

export default Inquiries;
