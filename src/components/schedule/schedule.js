import React from "react";
import { Row, Col } from "reactstrap";
import schedule from "../../data/schedule";
import speakers from "../../data/speakers.json";
import Button from "../atoms/button";

// const ListSpeakers = ({ speakers }) => {
//   const listSpeakers = speakers.map((speaker, index) => {
//     return (
//       <Media className="margin-bottom-48">
//         <Media left href="#" className="mr-2">
//           <Media object src={speaker.img} alt="Generic placeholder image" />
//         </Media>
//         <Media body className="ml-2">
//           <Media heading className="margin-bottom-16">
//             {speaker.title}
//           </Media>
//           <h6 className="margin-bottom-16">by {speaker.name}</h6>
//           <p style={{ lineHeight: "30px" }}>{speaker.description}</p>
//           <Button variant="outline">Read More</Button>
//         </Media>
//       </Media>
//     );
//   });

//   return <div>{listSpeakers}</div>;
// };

// const ScheduleTime = ({ day }) => {
//   const schedTime = schedule[day].map((sched, index) => {
//     return (
//       <div className="margin-bottom-96">
//         <h2 style={{ color: "#777" }} className="margin-bottom-64 text-center">
//           {sched.type}
//         </h2>
//         <Row key={index}>
//           <Col md={3}>
//             <p style={{ color: "#777" }}>{sched.time}</p>
//           </Col>
//           <Col md={9}>
//             <ListSpeakers speakers={sched.speaker} />
//           </Col>
//         </Row>
//       </div>
//     );
//   });

//   return <>{schedTime}</>;
// };

// const Schedule = ({ count }) => {
//   return (
//     <section className="padding-x-128">
//       <Container>
//         <ScheduleTime day={count} />
//       </Container>
//     </section>
//   );
// };

const DayOne = () => {
  const times = [
    "9:30AM",
    "10:00AM",
    "11:00AM",
    "11:30AM",
    "12:00NN",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "3:30PM",
    "4:30PM",
    "5:00PM",
  ];

  const schedule_list = times.map((time, key) => {
    const workshops = schedule["day_1"].map((workshop, index) => {
      if (workshop.time === time) {
        const target_speaker = speakers.filter(
          (x) => workshop["speaker_id"] === x.id
        )[0];
        return (
          <div key={index} className="d-flex margin-bottom-96">
            <div>
              <img
                src={target_speaker.image_url}
                className="d-block margin-right-24"
                style={{
                  width: "10.25rem",
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>

            <div>
              <h3 className="font-size-24">{workshop.title}</h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray">{workshop.description}</p>
              <Button
                variant="outline"
                style={{
                  padding: "1rem 2rem",
                }}
              >
                Read more
              </Button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <Row key={key}>
        <Col md={2}>
          <div
            style={{
              position: "sticky",
              top: 116,
            }}
          >
            <p className="gray margin-y-64">
              <strong>{time}</strong>
            </p>
          </div>
        </Col>
        <Col>{workshops}</Col>
      </Row>
    );
  });

  return <>{schedule_list}</>;
};

const DayTwo = () => {
  const times = [
    "9:30AM",
    "10:00AM",
    "11:00AM",
    "11:30AM",
    "12:00NN",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "3:30PM",
    "4:30PM",
    "5:00PM",
  ];

  const schedule_list = times.map((time, key) => {
    const workshops = schedule["day_2"].map((workshop, index) => {
      if (workshop.time === time) {
        const target_speaker = speakers.filter(
          (x) => workshop["speaker_id"] === x.id
        )[0];
        return (
          <div key={index} className="d-flex margin-bottom-96">
            <div>
              <img
                src={target_speaker.image_url}
                className="d-block margin-right-24"
                style={{
                  width: "10.25rem",
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>

            <div>
              <h3 className="font-size-24">{workshop.title}</h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray">{workshop.description}</p>
              <Button
                variant="outline"
                style={{
                  padding: "1rem 2rem",
                }}
              >
                Read more
              </Button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <Row key={key}>
        <Col md={2}>
          <div
            style={{
              position: "sticky",
              top: 116,
            }}
          >
            <p className="gray margin-y-64">
              <strong>{time}</strong>
            </p>
          </div>
        </Col>
        <Col>{workshops}</Col>
      </Row>
    );
  });

  return <>{schedule_list}</>;
};

const Schedule = ({ day }) => {
  return (
    <section className="padding-y-96">
      <div className="wrapper">
        {day === 1 && <DayOne />}
        {day === 2 && <DayTwo />}
      </div>
    </section>
  );
};

export default Schedule;
