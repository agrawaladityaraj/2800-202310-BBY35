import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const teamMembers = [
  {
    name: "Simrat",
    role: "Frontend Developer, Product Owner",
    github: "https://github.com/SimratKaur2",
    linkedin: "https://www.linkedin.com/in/simrat-kaur5980/",
  },
  {
    name: "Michelle",
    role: "Frontend Developer, QA Engineer",
    github: "https://github.com/michelle-0",
    linkedin: "https://www.linkedin.com/in/michelle-hung-596978262/",
  },
  {
    name: "Aditya",
    role: "Lead Developer",
    github: "https://github.com/agrawaladityaraj",
    linkedin: "https://www.linkedin.com/in/aditya-raj-agrawal-6b43971b5/",
  },
  {
    name: "Shawn",
    role: "Project Manager, AI Integration",
    github: "https://github.com/shawnbirring",
    linkedin: "https://www.linkedin.com/in/shawnbirring/",
  },
];

export default function Contact() {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", mt: "10vh" }}>
        {"Let's Meet the team!"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "10vh" }}>
        <TableContainer component={Paper} sx={{ maxWidth: "80%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Role</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>GitHub</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Linkden</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow
                  key={member.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <p>{member.name}</p>
                  </TableCell>
                  <TableCell align="right">{member.role}</TableCell>
                  <TableCell align="right">
                    <a href={member.github}>GitHub</a>
                  </TableCell>
                  <TableCell align="right">
                    <a href={member.linkedin}>LinkedIn</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
