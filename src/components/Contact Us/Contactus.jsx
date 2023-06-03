import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './Contactus.css'
import email_icon from './email_icon.jpg'
import TextField from '@mui/material/TextField';
import Footer from "../../components/Footer/footer.jsx"
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

const Contactus = () => {
    return (  
        <div>
            <Container className="headers">
                <Box sx={{ bgcolor: '#0C2542', height: '2rem' }} >
                    <h4 className="divider">Send Us Your Feedback</h4>
                </Box>
            </Container>
            <Avatar sx={{ width: 130, height: 130 }} src={email_icon} className='centeravatar'/>
            
                <form className='contact-container' action='https://getform.io/f/b9d39b1b-1a29-45f9-bac7-b56ab6a41a29' method='POST'>
                    <TextField InputProps={{style:{color:"black"}}} InputLabelProps={{ style: {color: "black"} }} className="contact-email" label="Enter Your Email" variant="outlined" type="text" name='email'/>
                    <TextField InputProps={{style:{color:"black"}}} InputLabelProps={{ style: {color: "black"} }} className="contact-name" label="Enter Your Name" variant="outlined" type="text" name='name'/>
                    <TextField InputProps={{style:{color:"black"}}} InputLabelProps={{ style: {color: "black"} }} className="contact-message" label="Enter Your Message" variant="outlined" type="text" name='message' multiline/>
                    <Button id="btn_contact" variant="contained" type='submit'>Send</Button>
                </form> 
                <Footer />
        </div>  
     );
}
 
export default Contactus;