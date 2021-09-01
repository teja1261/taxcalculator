import {Component} from 'react';
import Header from '../Header'
import './index.css'

class TaxCalculator extends Component{
    state = { 
        Bas:'',
        LTA:'', 
        HRA: '', 
        FA:'',
        Inv:'', 
        Rent:'', 
        cityType:'Metro City', 
        MedClaim:"", 
        taxableInc:'',
        showIncomeMsg: false,
    }

    onChangeBas = event => {
        this.setState({Bas: event.target.value})
    }

    onChangeLTA = event => {
        this.setState({LTA: event.target.value})
    }

    onChangeHRA = event => {
        this.setState({HRA: event.target.value})
    }

    onChangeFA = event => {
        this.setState({FA: event.target.value})
    }

    onChangeInv = event => {
        this.setState({Inv: event.target.value})
    }

    onChangeRent = event => {
        this.setState({Rent: event.target.value})
    }

    onChangeCity = event =>{
        this.setState({cityType: event.target.value})
    }

    onChangeMedValue = event =>{
        this.setState({MedClaim:event.target.value})
    }

    onChangeMed = event =>{
        console.log(event.target.value)
        if (event.target.value === 'yes'){
            this.setState({isMed :true})
        }else{
            this.setState({isMed:false})
        }   
    }

    calculateTaxableIncome = () => {
        const{Bas, LTA, HRA, FA, Inv, Rent, cityType, MedClaim} = this.state
        console.log(Bas, LTA, HRA, FA, Inv, Rent, cityType, MedClaim);
        let BasVal = parseInt(Bas)
        let LTAVal = parseInt(LTA)
        let HRAVal = parseInt(HRA)
        let FAVal = parseInt(FA)
        let InvVal = parseInt(Inv)
        let RentVal = parseInt(Rent)
        let MedVal = parseInt(MedClaim)
        let AppHRA;
        let v1, v2;
        if (cityType === 'Metro'){
            v1 = (BasVal * 0.5)
            v2 = (RentVal - (0.1 * BasVal))
            AppHRA = Math.min(v1, v2, HRAVal)
        }else{
            v1 = (BasVal * 0.4)
            v2 = (RentVal - (0.1 * BasVal))
            AppHRA = Math.min(v1,v2,HRAVal)
        }
        this.setState({taxableInc : ((BasVal + LTAVal + HRAVal +FAVal) - AppHRA - InvVal - MedVal), Bas:'',LTA:'', HRA: '', FA:'',Inv:'', Rent:'', cityType:'', MedClaim:"", showIncomeMsg: true})
    }

    submitForm = async event => {
        event.preventDefault()
        const{Bas, LTA, HRA, FA,Inv,Rent,cityType,MedClaim} = this.state 
        const confirmBox = window.confirm(
            `Confirm the details before clicking the ok ?
             1. Basic Salary: ${Bas}
             2. Leave Travel Allowance (LTA): ${LTA}
             3. House Rent Allowance(HRA): ${HRA}
             4. Food Allowance(FA): ${FA}
             5. Investment 80C: ${Inv}
             6. Actual Rent: ${Rent}
             7. Residence City Type: ${cityType}
             8. Mediclaim policy premium: ${MedClaim}
            `
          )
          if (confirmBox === true) {     
            const url = "http://localhost:3005/"
            const options = {
             headers:{
               "content-type": "application/json"
             },
             method: "POST",
             body: JSON.stringify({
               bas:Bas,
               lta:LTA,
               hra:HRA,
               fa:FA,
               inv:Inv,
               rent:Rent,
               city_type:cityType,
               med:MedClaim,
             })
          }
          await fetch(url, options);
          this.calculateTaxableIncome()
          }
    }    
    
    
    render(){
        const{Bas, LTA, HRA, FA,Inv,Rent,taxableInc,MedClaim, showIncomeMsg} = this.state
        return(
            <>
            <Header/>
            <div className="app-container">
                <form className="form-container" onSubmit={this.submitForm}>  
                    <div className="data-form-container">
                        <div className="form-element bg-col">
                           <label htmlFor="basic" className="label-text">Basic Salary</label>
                            <input type="tel"
                            id="basic"
                            placeholder="Enter the basic salary"
                            className="input-field"
                            value ={Bas}
                            onChange={this.onChangeBas}/>
                
                        </div>
                        <div className="form-element">
                            <label htmlFor="lta" className="label-text">
                            Leave Travel Allowance (LTA)
                            </label>
                            <input type="tel"
                            id="lta"
                            placeholder="LTA"
                            className="input-field"
                            value ={LTA}
                            onChange={this.onChangeLTA}/>
                        </div>
                        <div className="form-element bg-col">
                            <label htmlFor="hra" className="label-text">
                             House Rent Allowance(HRA)
                            </label>
                            <input type="tel"
                            id="hra"
                            placeholder="HRA"
                            className="input-field"
                            value ={HRA}
                            onChange={this.onChangeHRA}/>
                        </div>
                        <div className="form-element">
                            <label htmlFor="fa" className="label-text">
                            Food Allowance(FA)
                            </label>
                            <input type="tel"
                            id="fa"
                            placeholder="FA"
                            className="input-field"
                            value ={FA}
                            onChange={this.onChangeFA}/>
                        </div>
                        <div className="form-element bg-col">
                            <label htmlFor="inv" className="label-text">
                            Investment 80C
                            </label>
                            <input type="tel"
                            id="inv"
                            placeholder="Investment 80C"
                            className="input-field"
                            value ={Inv}
                            onChange={this.onChangeInv}/>
                            <p className="msg"><b>Note:</b> PPF, NSC, NPS, Tax saver FDs, Post Office Term Deposit, ELSS, ULIP, Senior Citizens Savings Scheme, Sukanya Samridhi Account. <a href="https://cleartax.in/s/how-to-reach-section-80c-limit-with-no-investments" target="_blank" rel="noopener noreferrer">Here is a complete guide to all the deductions allowed under Section 80C.</a></p>
                        </div>
                        <div className="form-element">
                            <label htmlFor="rent" className="label-text">
                                Actual Rent
                            </label>
                            <input type="tel"
                            id="rent"
                            placeholder="Rent"
                            className="input-field"
                            value ={Rent}
                            onChange={this.onChangeRent}/>
                        </div>
                        <div className="form-element bg-col">
                            <label htmlFor="city-type" className="label-text">Residence City Type</label>
                            <select 
                                value={this.state.selectValue} 
                                onChange={this.onChangeCity}
                                id="city-type"
                                className="input-field"
                            >
                                <option value="Select a Value">Select a value given below</option>
                                <option value="Metro City" selected>Metro City</option>
                                <option value="Non Metro City">Non Metro City</option>
                            </select>
                        </div>
                        <div className="form-element">
                            <label htmlFor="mediclaim" className="label-text">Mediclaim policy premium</label>
                            <input type="tel"
                            id="mediclaim"
                            placeholder="Mediclaim policy premium"
                            className="input-field"
                            value ={MedClaim}
                            onChange={this.onChangeMedValue}/>
                            <p className="msg"><b>Note:</b> if MediClaim available add the value else keep 0.</p>
                        </div>
                    </div>
                    <div className="btn">
                        <button type="submit" className="submit-button">
                        Income and Tax Calculator
                        </button>
                    </div>
                </form>
                {showIncomeMsg && <div className="tax-amount">{`Detail of TaxInc - ${taxableInc}`}</div>}  
            </div>
            </>
        )
    }
}
export default TaxCalculator