import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./components/UserCard";
import Container from "react-bootstrap/Container";
import {
  fetchData,
  setCurrentPage,
  applySearchAndFilter,
  setSelectedDomain,
  setSelectedGender,
  setAvailable,
  setSearchQuary,
} from "./app/Slice/usersSlice";
import { createTeam } from "./app/Slice/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import Accordion from "react-bootstrap/Accordion";
const App = () => {
  const dispatch = useDispatch();

  const orignal = useSelector((state) => state.usersSlice.orignal);
  const recent20 = useSelector((state) => state.usersSlice.recent20);
  const currentPage = useSelector((state) => state.usersSlice.currentPage);
  const totalUsers = useSelector((state) => state.usersSlice.totalUsers);
  const domains = useSelector((state) => state.usersSlice.domains);
  const genders = useSelector((state) => state.usersSlice.genders);
  const available = useSelector((state) => state.usersSlice.available);
  const teams = useSelector((state) => state.teamSlice.teams);
  const selectedGender = useSelector(
    (state) => state.usersSlice.selectedGender
  );
  const selecteDomain = useSelector((state) => state.usersSlice.selecteDomain);
  const searchQuary = useSelector((state) => state.usersSlice.searchQuary);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <>
      <div style={{ margin: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <img
            src="https://media.licdn.com/dms/image/C560BAQGuaOKqrv080A/company-logo_200_200/0/1668497687688?e=1695254400&v=beta&t=8hA6IFG8KIyOEhuu-V3zlvu52OQ2PcbbO_RlfW9KOfg"
            alt="logo"
            height={100}
          />{" "}
          <h5> Heliverse Frontend Assignment React js</h5>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            margin: 10,
          }}
        >
          <div>
            <label>Enter Name to Search : </label>
            <input
              type="text"
              value={searchQuary}
              onChange={(e) => {
                dispatch(setSearchQuary(e.target.value));
                dispatch(applySearchAndFilter());
              }}
              placeholder="Enter Name to search..."
            />
          </div>

          <div>
            <label>Doamin : </label>
            <select
              name="doamin"
              value={selecteDomain}
              onChange={(e) => {
                dispatch(setSelectedDomain(e.target.value));
                dispatch(applySearchAndFilter());
              }}
            >
              <option value="">select</option>
              {domains.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Gender : </label>
            <select
              name="gender"
              value={selectedGender}
              onChange={(e) => {
                dispatch(setSelectedGender(e.target.value));
                dispatch(applySearchAndFilter());
              }}
            >
              <option value="">select</option>
              {genders.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Availability : </label>
            <select
              name="available"
              value={available}
              onChange={(e) => {
                dispatch(setAvailable(e.target.value));
                dispatch(applySearchAndFilter());
              }}
            >
              <option value={undefined}>select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <h6 style={{ textAlign: "center" }}>Create Team</h6>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            margin: 10,
          }}
        >
          <input type="text" name="teamName" placeholder="Enter Team Name..." />
          <Button
            onClick={() => {
              dispatch(
                createTeam(document.getElementsByName("teamName")[0].value)
              );
              document.getElementsByName("teamName")[0].value = "";
            }}
          >
            Create Team
          </Button>
        </div>
        <hr />
        <h5>My Teams</h5>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Accordion>
            {teams.length != 0 ? (
              teams.map((team, key) => (
                <>
                  <Accordion.Item eventKey={key}>
                    <Accordion.Header>
                      <small> Click to See Team Number: {++key}</small>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h5>Team Name: {team.teamName}</h5>
                      {team.teamMembers.length != 0
                        ? orignal
                            .filter((obj) => team.teamMembers.includes(obj.id))
                            .map((obj) => <UserCard {...obj} />)
                        : "please add team members"}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              ))
            ) : (
              <li>please create a team</li>
            )}
          </Accordion>
        </div>
        <hr />
        <div
          style={{
            margin: 30,
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {currentPage > 0 ? (
            <Button
              onClick={() => {
                dispatch(setCurrentPage(currentPage - 1));
              }}
            >
              Priv
            </Button>
          ) : null}
          {currentPage < totalUsers / 20 - 1 ? (
            <Button
              onClick={() => {
                dispatch(setCurrentPage(currentPage + 1));
              }}
            >
              Next
            </Button>
          ) : null}
        </div>
        <Container
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {recent20.length != 0 ? (
            recent20.map((user, key) => {
              return <UserCard key={key} {...user} />;
            })
          ) : (
            <p>Sorry result found</p>
          )}
        </Container>
        <div
          style={{
            margin: 30,
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {currentPage > 0 ? (
            <Button
              onClick={() => {
                dispatch(setCurrentPage(currentPage - 1));
              }}
            >
              Priv
            </Button>
          ) : null}
          {currentPage < totalUsers / 20 - 1 ? (
            <Button
              onClick={() => {
                dispatch(setCurrentPage(currentPage + 1));
              }}
            >
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
