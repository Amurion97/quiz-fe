import { Avatar, Box, Card, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

export default function StudentsLounge({ peopleList }) {
  return (
    <>
      <Grid container spacing={3} sx={{ pt: 5, px: 2 }}>
        {peopleList.map((person) => (
          <Grid key={person.id} item xs={12} sm={6} md={4}>
            <Card sx={{ pb: "24px", height: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src="/assets/images/avatars/avatar_default.jpg"
                    alt="photoURL"
                  />
                }
                title={person.email}
                subheader="Student"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
