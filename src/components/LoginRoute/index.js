import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from "js-cookie";
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./index.css"

const paperStyle = {padding :20,height:'60vh',width:280, margin:"50px auto"}
const avatarStyle = {backgroundColor:'#1bbd7e'}
const btnStyle = {margin:'8px 0'}

class Login extends Component {
    state = {
        username: '',
        password: '',
        showSubmitError: false,
        errorMsg: '',
      }
    
      onChangeUsername = event => {
        this.setState({username: event.target.value})
      }
    
      onChangePassword = event => {
        this.setState({password: event.target.value})
      }
    
      onSubmitSuccess = jwtToken => {
        const {history} = this.props
    
        Cookies.set('jwt_token', jwtToken, {
          expires: 30,
          path: '/',
        })
        history.replace('/')
      }

      submitForm = async event => {
        event.preventDefault()
        const {username, password} = this.state
        const userDetails = {username, password}
        const url = 'http://localhost:3005/login'
        const options = {
          headers:{
            "content-type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
          this.onSubmitSuccess(data.jwt_token)
        } else {
          this.setState({showSubmitError: true, errorMsg: "UserId and Password didn't match"})
          console.log(this.state.errorMsg)
        }
      }
    

    render() {
        const {showSubmitError, errorMsg} = this.state
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken !== undefined) {
        return <Redirect to="/posts" />
        }

      return(
          <Grid>
              <Paper elevation={10} style={paperStyle}>
                  <Grid align='center'>
                       <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                      <h2>Sign In</h2>
                  </Grid>
                  <form onSubmit={this.submitForm}>
                    <TextField label='Username' placeholder='Enter username' onChange={this.onChangeUsername} fullWidth required/>
                    <TextField label='Password' placeholder='Enter password' type='password' onChange={this.onChangePassword} fullWidth required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Sign in</Button>
                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                    </form>
              </Paper>
          </Grid>
      )
    }
}

export default Login