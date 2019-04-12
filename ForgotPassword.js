import React from 'react'
import { auth } from '../../firebase'
import { Row, Input, Badge } from 'react-materialize'
import { connect } from 'react-redux'
import { addUser } from '../../store/user'
import GuestNavbar from '../shared/GuestNavbar'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { GoogleIcon, FacebookIcon, GithubIcon, TwitterIcon } from '../shared/SocialIcons'
import { Link } from 'react-router-dom'

const styles = theme => ({
  pageContainer: {
    backgroundImage: "url(images/background.png)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },  
  contentContainer: {
    marginTop: "calc((100vh - 624px) / 2)",
    width: 342,
    height: 543,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.3), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px transparent",
    backgroundImage: "linear-gradient(#ffffff, #ffffff), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0))",
    '@media (max-width: 1023px)': {
      marginTop: 24,
    }
  },
  headingContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    margintop: 36,
  },
  iconListContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
    height: 18,
  },
  paragraphContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
    height: 15,
  },
  formContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    width: 342,
    marginTop: 34,
  },
  footerContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
    marginBottom: 38,
  },
  signupForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 290,
  },
  submitButton: {
    padding: 0,
    width: 96,
    height: 36,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.13,
    letterSpacing: 1.3,
    textAlign: "center",
    marginTop: 60,
    color: "white",
    backgroundColor: "#6200EE",
    '&:hover': {
     backgroundColor: 'rgba(98, 0, 238, 0.58)',
    },
    '&:focus': {
     backgroundColor: "#6200EE",
    },
    '&:disabled': {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      color: "white",
      opacity: 0.12,
    },
  },
  formHeading: {
    width: 225,
    height: 28,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000000",
  },
  iconList: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    height: 28,
    width: 190,
  },
  iconListItem: {
    cursor: "pointer",
  },
  para: {
    width: 225,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 300,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000000",
  },
  footerLine: {
    margin: 0,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#9b9b9b",
  },
  inputLabel: {
    top: 5,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "rgba(0, 0, 0, 0.38)",

  },
  focused: {
    '&$focused': {
      color: "rgba(0, 0, 0, 0.38)",
    },
  },
  errorMessage: {
    margin: '0 auto',
    color: 'red',
    fontSize: 12,
    marginTop: 18,
    width: 290,
  },
})

// This is due to materialize overriding inputs.
// TODO: readjust this after completely removing materialize styless
const inputStylesOverrides = {
  height: '40px',
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
};


class ForgotPassword extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        passwordResetted: false,
      }
    }

    render() {
      const { classes } = this.props;
        // input handlers with validation
        const onEmailChange = (event) => {
          this.setState({ email: event.target.value });
        }

        // submit handler
        const onSubmit = () => {
          this.setState({errored: false, errorMessage: ''});
          const { email, password } = this.state
          auth.sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({
              passwordResetted: true,
            })
          }).catch(() => {
            this.setState({
              passwordResetted: true,
            })
          })
 
        }

        const resetForm = (
          <React.Fragment>
            <div className={classes.formContainer}>
              <form className={classes.signupForm} noValidate autoComplete="off">
                <TextField
                  label="Email"
                  type="email"
                  error={!this.state.errored}
                  onChange={onEmailChange}
                  value={this.state.email}
                  InputProps={{
                      disableUnderline: true,
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel,},
                    FormLabelClasses: {root: classes.focused},
                  }}
                  inputProps={{
                    style: inputStylesOverrides
                  }}
                  style={{height: '30px'}}
                  fullWidth
                />
                <Button className={classes.submitButton} onClick={onSubmit}>
                  Reset
                </Button>
              </form>
            </div>
            <div className={classes.footerContainer}>
              <p className={classes.footerLine}>Remember Now? <Link to="/login" style={{color: "#6200ee", fontWeight: 500 }}>Log In</Link></p>              
            </div>
          </React.Fragment>
        )

        const loginLink = (
          <div className={classes.paragraphContainer}>
            <p className={classes.para}>
              If you have succesfully resetted, try logging in <Link to="/login"  style={{color: "#6200ee", fontWeight: 500 }}>here</Link>. 
              Otherwise, you can sign up for new account <Link to="/signup"  style={{color: "#6200ee", fontWeight: 500 }}>here</Link>.
            </p>
          </div>
        );


        return (
          <div className={classes.pageContainer}>
            <GuestNavbar />
            <Paper className={classes.contentContainer}>
              <div className={classes.headingContainer}>
                <h3 className={classes.formHeading}>Forgot Password?</h3>
              </div>
              <div className={classes.paragraphContainer}>
                <p className={classes.para}>
                  { this.state.passwordResetted ? 'Please check your inbox for the reset password email.' : 'Get a password reset link sent to your inbox.' }
                </p>
              </div>
              { this.state.passwordResetted ? loginLink : resetForm }              
            </Paper>
          </div>
        )
    }
}

const mapDispatch = dispatch => ({ addUser: userID => dispatch(addUser(userID)) })

export default withStyles(styles)(connect(null, mapDispatch)(ForgotPassword));
