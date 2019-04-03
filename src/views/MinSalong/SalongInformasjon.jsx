/**
 * Description: Dashboard view
 * Date: 12/21/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import * as Validator from "../../validator";

import salongInformasjonStyle from "assets/jss/material-dashboard-pro-react/views/salongInformasjonStyle.jsx";

class SalongInformasjon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            name: "",
            nameState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            phone: "",
            phoneState: "",
            email: "",
            emailState: "",
            network: "",
            networkState: "",
            parkCheck: false,
            accessCheck: false,
            description: "",

            s_co: "",
            s_coState: "",
            s_address1: "",
            s_address1State: "",
            s_address2: "",
            s_address2State: "",
            s_city: "",
            s_cityState: "",
            s_zip: "",
            s_zipState: "",
            s_country: "",
            s_countryState: "",
            isEdit: false
        }
    }

    componentWillMount() {
        this.props.getUserData();
        setTimeout(() => {
            this.getSalonInfo(this.props.workingForId);
        }, 100);
    }

    getSalonInfo(id) {
        this.props.getSalonInfo({
            workingForId: id
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.workingForId !== nextProps.workingForId) {
            this.getSalonInfo(nextProps.workingForId);
        }

        if(nextProps.info) {
            console.log('info: ', nextProps.info)
            this.setState({
                name: nextProps.info.name? nextProps.info.name : "",
                nameState: nextProps.info.name? "success" : "error",
                address: nextProps.info.address? nextProps.info.address : "",
                addressState: nextProps.info.address? "success" : "error",
                zip: nextProps.info.post? nextProps.info.post : "",
                zipState: nextProps.info.post? "success" : "error",
                city: nextProps.info.city? nextProps.info.city : "",
                cityState: nextProps.info.city? "success" : "error",
                phone: nextProps.info.telephone? nextProps.info.telephone : "",
                phoneState: nextProps.info.telephone? "success" : "error",
                email: nextProps.info.email? nextProps.info.email : "",
                emailState: nextProps.info.email? "success" : "error",
                network: nextProps.info.website? nextProps.info.website : "",
                networkState: nextProps.info.website? "success" : "error",
                description: nextProps.info.description? nextProps.info.description : "",
                descriptionState: nextProps.info.description? "success" : "error",
                parkCheck: nextProps.info.parking,
                // accessCheck: nextProps.info.description

                s_co: nextProps.info.ShippingAddress.co? nextProps.info.ShippingAddress.co : "",
                s_coState: nextProps.info.ShippingAddress.co? "success" : "error",
                s_address1: nextProps.info.ShippingAddress.street1? nextProps.info.ShippingAddress.street1 : "",
                s_address1State: nextProps.info.ShippingAddress.street1? "success" : "error",
                s_address2: nextProps.info.ShippingAddress.street2? nextProps.info.ShippingAddress.street2 : "",
                s_address2State: nextProps.info.ShippingAddress.street2? "success" : "error",
                s_city: nextProps.info.ShippingAddress.city? nextProps.info.ShippingAddress.city : "",
                s_cityState: nextProps.info.ShippingAddress.city? "success" : "error",
                s_zip: nextProps.info.ShippingAddress.postalCode? nextProps.info.ShippingAddress.postalCode : "",
                s_zipState: nextProps.info.ShippingAddress.postalCode? "success" : "error",
                s_country: nextProps.info.ShippingAddress.country? nextProps.info.ShippingAddress.country : "",
                s_countryState: nextProps.info.ShippingAddress.country? "success" : "error"
            })
        }
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "name":
            case "address":
            case "zip":
            case "city":
            case "phone":
            case "s_co":
            case "s_address1":
            case "s_address2":
            case "s_zip":
            case "s_city":
            case "s_country":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
                // if(this.state.phone.length === 0) {
                //     this.setState({
                //         phone: "+46" + event.target.value
                //     })
                // } else {
                //     this.setState({
                //         phone: event.target.value
                //     })
                // }
                // if (Validator.verifyPhone(event.target.value)) {
                //     this.setState({ [stateName + "State"]: "success" });
                // } else if(Validator.verifyPhone(event.target.value) === "") {
                //     this.setState({ [stateName + "State"]: "" });
                // } else {
                //     this.setState({ [stateName + "State"]: "error" });
                // }
                break;
            case "email":
                this.setState({
                    email: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if(Validator.verifyEmail(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "network":
                this.setState({
                    network: event.target.value
                })
                if (Validator.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else if (Validator.verifyUrl(event.target.value) === "") {
                    this.setState({ [stateName + "State"]: "" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "description":
                this.setState({
                    description: event.target.value
                })
            default:
                break;
        }
    }

    toggleCheck(event, stateName) {
        this.setState({ [stateName]: event.target.checked });
    }

    canSubmit() {
        if(this.state.nameState === "success" &&
            this.state.addressState === "success" &&
            this.state.zipState === "success" &&
            this.state.cityState === "success" &&
            this.state.phoneState === "success" &&
            this.state.emailState === "success" &&
            this.state.networkState === "success" &&
            this.state.s_coState === "success" &&
            this.state.s_address1State === "success" &&
            this.state.s_address2State === "success" &&
            this.state.s_cityState === "success" &&
            this.state.s_zipState === "success" &&
            this.state.s_countryState === "success") {
            return false;
        } else {
          return true
        }
    }

    enableEdit() {
        this.setState({
            isEdit: true
        })
    }

    cancelEdit() {
        this.setState({
            name: this.props.info.name? this.props.info.name : "",
            nameState: this.props.info.name? "success" : "error",
            address: this.props.info.address? this.props.info.address : "",
            addressState: this.props.info.address? "success" : "error",
            zip: this.props.info.post? this.props.info.post : "",
            zipState: this.props.info.post? "success" : "error",
            city: this.props.info.city? this.props.info.city : "",
            cityState: this.props.info.city? "success" : "error",
            phone: this.props.info.telephone? this.props.info.telephone : "",
            phoneState: this.props.info.telephone? "success" : "error",
            email: this.props.info.email? this.props.info.email : "",
            emailState: this.props.info.email? "success" : "error",
            network: this.props.info.website? this.props.info.website : "",
            networkState: this.props.info.website? "success" : "error",
            description: this.props.info.description? this.props.info.description : "",
            descriptionState: this.props.info.description? "success" : "error",

            s_co: this.props.info.ShippingAddress.co? this.props.info.ShippingAddress.co : "",
            s_coState: this.props.info.ShippingAddress.co? "success" : "error",
            s_address1: this.props.info.ShippingAddress.street1? this.props.info.ShippingAddress.street1 : "",
            s_address1State: this.props.info.ShippingAddress.street1? "success" : "error",
            s_address2: this.props.info.ShippingAddress.street2? this.props.info.ShippingAddress.street2 : "",
            s_address2State: this.props.info.ShippingAddress.street2? "success" : "error",
            s_city: this.props.info.ShippingAddress.city? this.props.info.ShippingAddress.city : "",
            s_cityState: this.props.info.ShippingAddress.city? "success" : "error",
            s_zip: this.props.info.ShippingAddress.postalCode? this.props.info.ShippingAddress.postalCode : "",
            s_zipState: this.props.info.ShippingAddress.postalCode? "success" : "error",
            s_country: this.props.info.ShippingAddress.country? this.props.info.ShippingAddress.country : "",
            s_countryState: this.props.info.ShippingAddress.country? "success" : "error",

            isEdit: false
        });
    }

    updateSalonInfo() {
        this.props.updateSalonInfo({
            workingForId: this.props.workingForId,
            salonData: {
                email: this.state.email,
                name: this.state.name,
                description: this.state.description,
                telephone: this.state.phone,
                // descriptionValidated: false,
                parking: this.state.parkCheck,
                website: this.state.network,
                address: this.state.address,
                post: this.state.zip,
                city: this.state.city,
                country: "Sweden"
            },
            shippingAddress: {
                street1: this.state.s_address1,
                street2: this.state.s_address2,
                postalCode: this.state.s_zip,
                city: this.state.s_city,
                country: this.state.s_country,
                co: this.state.s_co
            }
        });
        // this.cancelEdit();
        this.setState({
            isEdit: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
        <Card>
            <CardHeader>            
                <div className={classes.cardHeader}>
                    <h3 className={classes.cardTitle}>Salongsinformation</h3>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.nameState === "success"}
                                error={this.state.nameState === "error"}
                                labelText="Salongens namn *"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.nameState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "name", "name", 0),
                                    value: this.state.name,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.addressState === "success"}
                                error={this.state.addressState === "error"}
                                labelText="Adress *"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.addressState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "address", "address", 0),
                                    value: this.state.address,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.cityState === "success"}
                                error={this.state.cityState === "error"}
                                labelText="Postort *"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.cityState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "city", "city", 0),
                                    value: this.state.city,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <CustomInput
                                success={this.state.zipState === "success"}
                                error={this.state.zipState === "error"}
                                labelText="Postnummer *"
                                id="zip"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.zipState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "zip", "zip", 0),
                                    value: this.state.zip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.phoneState === "success"}
                                error={this.state.phoneState === "error"}
                                labelText="Telefonnummer *"
                                id="phone"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.phoneState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "phone", "phone", 1),
                                    value: this.state.phone,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.emailState === "success"}
                                error={this.state.emailState === "error"}
                                labelText="E-post *"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.emailState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "email", "email", 0),
                                    value: this.state.email,
                                    type: "email"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                success={this.state.networkState === "success"}
                                error={this.state.networkState === "error"}
                                labelText="Hemsida *"
                                id="network"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.networkState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "network", "network", 0),
                                    value: this.state.network,
                                    type: "url"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Salongsbeskrivning"
                                id="description"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 4,   
                                    disabled: !this.state.isEdit,                                 
                                    onChange: event =>
                                        this.change(event, "description", "description", 0),
                                    value: this.state.description,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem sm={6} md={3}>                        
                            <div className={classes.checkboxAndRadio}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={event =>
                                                this.toggleCheck(event, "parkCheck")
                                            }
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{
                                                checked: classes.checked,
                                                root: classes.checkRoot
                                            }}
                                            disabled={!this.state.isEdit}
                                            checked={this.state.parkCheck}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Har salongen Parkering"
                                />
                            </div>
                        </GridItem>
                        <GridItem sm={6} md={3}>                        
                            <div className={classes.checkboxAndRadio}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={event =>
                                                this.toggleCheck(event, "accessCheck")
                                            }
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{
                                                checked: classes.checked,
                                                root: classes.checkRoot
                                            }}
                                            disabled={!this.state.isEdit}
                                            checked={this.state.accessCheck}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Tillgänglighetsanpassat"
                                />
                            </div>
                        </GridItem>
                    </GridContainer>            
                    <div className={classes.cardHeader}>
                        <h3 className={classes.cardTitle}>ShippingAddress</h3>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_coState === "success"}
                                error={this.state.s_coState === "error"}
                                labelText="Co *"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_coState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_co", "s_co", 0),
                                    value: this.state.s_co,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_address1State === "success"}
                                error={this.state.s_address1State === "error"}
                                labelText="Adress1 *"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_address1State === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_address1", "s_address1", 0),
                                    value: this.state.s_address1,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_address2State === "success"}
                                error={this.state.s_address2State === "error"}
                                labelText="Adress2 *"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_address2State === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_address2", "s_address2", 0),
                                    value: this.state.s_address2,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_cityState === "success"}
                                error={this.state.s_cityState === "error"}
                                labelText="Postort *"
                                id="city"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_cityState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_city", "s_city", 0),
                                    value: this.state.s_city,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_zipState === "success"}
                                error={this.state.s_zipState === "error"}
                                labelText="Postnummer *"
                                id="zip"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_zipState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_zip", "s_zip", 0),
                                    value: this.state.s_zip,
                                    type: "number"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <CustomInput
                                success={this.state.s_countryState === "success"}
                                error={this.state.s_countryState === "error"}
                                labelText="Country *"
                                id="s_country"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment:
                                      this.state.s_countryState === "error" ? (
                                        <InputAdornment position="end">
                                          <Warning className={classes.danger} />
                                        </InputAdornment>
                                      ) : (
                                        undefined
                                    ),
                                    disabled: !this.state.isEdit,
                                    onChange: event =>
                                        this.change(event, "s_country", "s_country", 0),
                                    value: this.state.s_country,
                                    type: "text"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="flex-end" alignItems="flex-end">
                        {
                            this.state.isEdit? (                      
                                <GridItem xs={12} sm={12} md={6}>                    
                                    <Button color="info" size="sm" className={classes.submit} disabled={this.canSubmit()} onClick={this.updateSalonInfo.bind(this)}>LAGRE</Button>
                                    <Button color="danger" size="sm" className={classes.submit} onClick={this.cancelEdit.bind(this)}>Cancel</Button>
                                </GridItem>                                
                            ) : (
                                <GridItem xs={12} sm={12} md={6}>                    
                                    <Button color="info" size="sm" className={classes.submit} onClick={this.enableEdit.bind(this)}>Redigera</Button>
                                </GridItem> 
                            )
                        } 
                    </GridContainer>
                </form>
            </CardBody>
        </Card>
        );
    }
}

SalongInformasjon.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.user.workingForId,
        info: state.salonInfo.info
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({          
    getUserData : Actions.getUserData,
    getSalonInfo: Actions.getSalonInfo,
    updateSalonInfo: Actions.updateSalonInfo
    }, dispatch);
}
  
  export default withStyles(salongInformasjonStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalongInformasjon)));
