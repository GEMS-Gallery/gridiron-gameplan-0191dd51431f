import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { backend } from 'declarations/backend';

interface Game {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  venue: string;
}

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [seasonInfo, setSeasonInfo] = useState<{ year: string; startDate: string | null; endDate: string | null }>({ year: '', startDate: null, endDate: null });

  useEffect(() => {
    fetchSeasonInfo();
    fetchSchedule(selectedWeek);
  }, [selectedWeek]);

  const fetchSeasonInfo = async () => {
    try {
      const info = await backend.getSeasonInfo();
      setSeasonInfo(info);
    } catch (error) {
      console.error('Error fetching season info:', error);
    }
  };

  const fetchSchedule = async (week: number) => {
    setLoading(true);
    try {
      // Note: This is a mock API call. In a real scenario, you would use the actual ESPN API endpoint.
      const response = await fetch(`https://api.example.com/nfl/schedule/2024/${week}`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ my: 4 }}>
        NFL Schedule {seasonInfo.year}
      </Typography>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="week-select-label">Week</InputLabel>
        <Select
          labelId="week-select-label"
          value={selectedWeek}
          label="Week"
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
        >
          {[...Array(18)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>Week {i + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Grid container spacing={3}>
          {schedule.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {new Date(game.date).toLocaleDateString()}
                  </Typography>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={5}>
                      <img src={game.awayTeamLogo} alt={game.awayTeam} style={{ maxWidth: '50px' }} />
                      <Typography>{game.awayTeam}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6">@</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <img src={game.homeTeamLogo} alt={game.homeTeam} style={{ maxWidth: '50px' }} />
                      <Typography>{game.homeTeam}</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="text.secondary">
                    {game.venue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default App;
