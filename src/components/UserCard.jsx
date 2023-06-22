import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useSelector, useDispatch } from "react-redux";
import { addMember } from "../app/Slice/teamSlice";
useSelector;
const UserCard = ({
  id,
  first_name,
  last_name,
  email,
  gender,
  avatar,
  domain,
  available,
}) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teamSlice.teams);
  const [selectedTeam, setSelectedTeam] = useState(undefined);
  return (
    <Card>
      <Card.Header>
        {first_name} {last_name}
      </Card.Header>
      <Card.Body>
        <Image
          src={avatar}
          roundedCircle
          className="mb-3"
          alt="User Avatar"
          width={50}
          height={50}
        />
        <Card.Text>
          <strong>Email:</strong> {email}
          <br />
          <strong>Gender:</strong> {gender}
          <br />
          <strong>Domain:</strong> {domain}
          <br />
          <strong>Availability:</strong>{" "}
          {available ? "Available" : "Unavailable"}
          <br />
          {available ? (
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
                margin: 10,
              }}
            >
              <select
                value={selectedTeam}
                onChange={(e) => {
                  setSelectedTeam(e.target.value);
                }}
              >
                <option value={undefined}>select</option>
                {teams.map((team, key) => {
                  return (
                    <option key={key} value={team.teamName}>
                      {team.teamName}
                    </option>
                  );
                })}
              </select>
              <Button
                onClick={() => {
                  dispatch(addMember({ selectedTeam, id }));
                }}
              >
                Add to Team
              </Button>
            </div>
          ) : null}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
