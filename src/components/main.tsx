import React, {useState} from 'react';
import fs from 'fs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 20,
    },
    paper: {
      width: 400,
    },
  }));

type Entry = {
    address: string,
    price: string,
    sqft: string,
    type: string,
    location: string,
    link: string,
};

export default function Main() {
  const filenames = fs.readdirSync('.');
  const classes = useStyles();
  const names = filenames.map((name) => {
    return <li key={name}>{name}</li>;
  });
  const [wishlist, setWishlist] = useState([{
      address: '306 New York Avenue, Unit 201, Union City',
      price: '619000',
      sqft: '1201',
      type: '2b2b',
      location: 'in the middle of weehawken and hoboken',
      link: 'https://www.compass.com/listing/306-new-york-avenue-unit-201-union-city-nj-07087/650588403839277593/',
  }]);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [sqft, setSqft] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const addEntry = () => {
    const foundDuplicate = wishlist.findIndex((e) => {
        return address === e.address;
    }) !== -1;
    if (foundDuplicate === false) {
        setWishlist(wishlist.concat([{
            address,
            price,
            sqft,
            type,
            location,
            link,
        }]));
        setAddress('');
        setPrice('');
        setSqft('');
        setType('');
        setLocation('');
        setLink('');
    }
  }
  const deleteEntry = (data: Entry) => {
    setWishlist(wishlist.filter(item => {
        return item.address !== data.address;
    }));
  }
  return (
    <Grid container className={classes.root} spacing={4}>
        <Grid item xs={12}>
            <Grid container spacing={4}>
                <Grid item xs={6} spacing={2}>
                    <Paper className={classes.paper}>
                        <div>
                            <ul style={{ overflow: 'auto', height: '300px' }}>{names}</ul>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3} spacing={2}>
                    <Paper>
                        <TextField label="address" variant="outlined" value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                        <TextField label="price" variant="outlined" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                        <TextField label="link" variant="outlined" value={link} onChange={(e) => {setLink(e.target.value)}}/>
                        <TextField label="sqrt" variant="outlined" value={sqft} onChange={(e) => {setSqft(e.target.value)}}/>
                        <TextField label="type" variant="outlined" value={type} onChange={(e) => {setType(e.target.value)}}/>
                        <TextField label="location" variant="outlined" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                        <Button onClick={addEntry}>Add</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} spacing={6}>
            <Grid container spacing={4}>
                    {
                        wishlist.map((h) => {
                            return <WishCard data={h} key={h.address} deleteEntry={deleteEntry}/>;
                        })
                    }
            </Grid>
        </Grid>
    </Grid>
  );
}

type WishCardProps = {
    data: Entry,
    deleteEntry: (data: Entry) => void
}

function WishCard(props: WishCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography>{props.data.address}</Typography>
                <Typography>{props.data.price}</Typography>
                <Typography>{props.data.sqft}</Typography>
                <Typography>{props.data.type}</Typography>
                <Typography>{props.data.location}</Typography>
                <Typography>{props.data.link}</Typography>
                <Button variant="outlined" onClick={()=>{props.deleteEntry(props.data)}}>Delete</Button>
            </CardContent>
        </Card>
    )
}
