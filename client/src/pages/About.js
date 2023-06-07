import React, { useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import anime from 'animejs';
import member1 from '../aboutUs-imgs/Aarti.jpg'
import member2 from '../aboutUs-imgs/Laurie.jpeg'
import member3 from '../aboutUs-imgs/Kaiden.JPG';
import member4 from '../aboutUs-imgs/Amanda.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
    },
    card: {
        maxWidth: '100%',
        borderRadius: '15px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        backgroundColor: theme.palette.background.default,
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows[3],
    },
}));

const About = () => {
    const classes = useStyles();

    const teamMembers = [
        { name: 'Aarti Contractor', role: 'Founder', image: member1 },
        { name: 'Laurie Fish', role: 'Founder', image: member2 },
        { name: 'Kaiden Parcher', role: 'Founder', image: member3 },
        { name: 'Amanda Gray', role: 'Founder', image: member4 },
    ];

    useEffect(() => {
        anime({
            targets: '.animate',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(200)
        });
    }, []);

    return (
        <Container>
            <Box className={classes.root}>
                <Typography variant="h2" gutterBottom>
                    About Us
                </Typography>

                <Typography variant="body1" paragraph>
                    Many people can't afford to purchase everything new. With NeighBorrow, now you can just borrow something for a few days, and go on unforgettable experiences that you never would have been able to experience before.
                    Sharing items is not only good for the environment, it creates strong bonds and connections between you and anyone else in your neighborhood, who both use the same item(s).
                </Typography>

                <Typography variant="h4" gutterBottom style={{ marginTop: '2em' }}>
                    Meet the Team
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} lg={3} key={index} className="animate">
                            <Card className={classes.card}>
                                <Box display="flex" justifyContent="center" boxShadow={3} bgcolor="#3f51b5">
                                    <Avatar alt={member.name} src={member.image} className={classes.avatar} />
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" align="center">
                                        {member.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default About;
