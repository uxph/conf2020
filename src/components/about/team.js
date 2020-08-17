import React from "react";
import members from "../../data/members.json";
import { Container } from "reactstrap";

const ListTeam = ({ teamMembers }) => {
  const list = teamMembers.map((member, index) => {
    // const social_list = member.social_media.map((social) => {
    //   return social;
    // });
    return (
      <div
        md={3}
        xs={6}
        className="member-card margin-bottom-64 text-center"
        key={index}
      >
        <div className="avatar-placeholder">
          <img src={"/" + member.image_url} alt={member.name} />
        </div>
        <h5>{member.name}</h5>
        <p>{member.position}</p>
        <div className="social-links">{/*{social_list}*/}</div>
      </div>
    );
  });

  return <div className="team-row margin-x-128">{list}</div>;
};

const Team = () => {
  return (
    <section className="padding-y-128 team-section">
      <Container>
        <h2 className="margin-bottom-96 text-center">Our Organizing Team</h2>
        <h3 className="margin-bottom-32 text-center">Team Leads</h3>
        <ListTeam teamMembers={members.committee_leads} />
        <h3 className="margin-bottom-32 text-center">Core Team</h3>
        <ListTeam teamMembers={members.coordinators} />
        <h3 className="margin-bottom-32 text-center">Advisory Board</h3>
        <ListTeam teamMembers={members.board_members} />
      </Container>
    </section>
  );
};

export default Team;
