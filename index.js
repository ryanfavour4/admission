//needed things from user object
let candidate_store = {
    firstName:'',
    lastName:'',
    userState:'',
    jambScore:'', //you'll need to number this though
    postUtmeScore:'',  //you'll need to number this though
    finalScore:''
}

let olevel = []


const kick_out_board = document.querySelector('.kick_out_board')
const kick_out_message = document.querySelector('.kick_out_message')

// flow 1 check variables
const fname = document.querySelector('#fname')
const lname = document.querySelector('#lname')
const number = document.querySelector('#number')
const date = document.querySelector('#date')
const mail = document.querySelector('#mail')
const state = document.querySelector('#state')

const submit_flow_1 = document.querySelector('#submit_flow_1')

const flow_1_error = document.querySelector('.flow_1_error')



// flow 2 check variables
const faculty = document.querySelector('#faculty')
const jamb_score = document.querySelector('#jamb_score')
const post_utme_score = document.querySelector('#post_utme_score')

const submit_flow_2 = document.querySelector('#submit_flow_2')

const flow_2_error = document.querySelector('.flow_2_error')



// flow 3
const all_subjects = document.querySelectorAll('.flow_3 select:nth-child(2)');
const submit_flow_3 = document.querySelector('#submit_flow_3');
const flow_3_error = document.querySelector('.flow_3_error')






let check = {
    
    personflow1:{
       
        // === constructor object property === //
        fname:'',
        lname:'',
        number:'',
        date:'',
        number:'',
        date:'',
        mail:'',
        state:'',
        IsValid:function (){
            
            // === grabbing inputs and assign them to the object constructor property === //

            this.fname = fname.value
            this.lname = lname.value
            this.number = number.value
            this.date = date.value
            this.mail = mail.value
            this.state = state.value
            
            //==== check to see if the user is inputing anything stupid ===//
            
            if (this.fname.length <= 1 || this.lname.length <= 1 || this.number.length <= 1 || this.date.length <= 1 || this.mail.length <= 1 || this.state.length <= 1) {
                flow_1_error.classList.add('error_box')
                flow_1_error.innerHTML = "All Fields are required"
                // take away the error message after some time
                setTimeout(()=>{
                    flow_1_error.classList.remove('error_box')
                    flow_1_error.innerHTML = null
                },3000)
                return false
            }

            if(new Date().getFullYear() - new Date(this.date).getFullYear() < 16 || new Date().getFullYear() - new Date(this.date).getFullYear() > 35 ){
                flow_1_error.classList.add('error_box')
                flow_1_error.innerHTML = "Sorry Candidates age must between age 16 to 34"
                // take away the error message after some time
                setTimeout(()=>{
                    flow_1_error.classList.remove('error_box')
                    flow_1_error.innerHTML = null
                },3000)
                return false
            }
            else{
                candidate_store.firstName=this.fname
                candidate_store.userState=this.state
            }
            return true
        }

    },

    // === Second flow check

    personflow2:{
        faculty:'',
        jamb_score:'',
        post_utme_score:'',
        calculateUtme:function () {
            
            this.faculty = faculty.value,
            this.jamb_score = jamb_score.value
            this.post_utme_score = post_utme_score.value
            
            // === selecting our users utme scores === //

            if (this.faculty.length < 1) {
                flow_2_error.innerHTML = "Please Select A Faculty"
                flow_2_error.classList.add('error_box')
                // take away the error message after some time
                setTimeout(()=>{
                    flow_2_error.classList.remove('error_box')
                    flow_2_error.innerHTML = null
                },3000)
                return false
            }
            
            // == check jamb === //

            if (Number(this.jamb_score) <= 0 || Number(this.jamb_score) > 400 || isNaN(this.jamb_score)) {
                flow_2_error.innerHTML = "Please Input A Proper Jamb Score"
                flow_2_error.classList.add('error_box')
                // take away the error message after some time
                setTimeout(()=>{
                    flow_2_error.classList.remove('error_box')
                    flow_2_error.innerHTML = null
                },3000)
                return false
            }
            
            // === check post utme === //

            if (Number(this.post_utme_score) <= 0 || Number(this.post_utme_score) > 20 || isNaN(this.post_utme_score)) {
                flow_2_error.innerHTML = "Please Input A Proper Post UTME Score"
                flow_2_error.classList.add('error_box')
                // take away the error message after some time
                setTimeout(()=>{
                    flow_2_error.classList.remove('error_box')
                    flow_2_error.innerHTML = null
                },3000)
                return false
            }
               
            // === check to disqualify user === //

            if (Number(this.post_utme_score) < 12 || (Number(this.jamb_score) / 8) < 20) {
                kick_out_message.innerHTML = "You have been disqualified due to your UTME Scores"
                kick_out_board.classList.remove('gone')
            }
            else{
                candidate_store.jambScore = this.jamb_score
                candidate_store.postUtmeScore = this.post_utme_score
            }

            return true
        }
    }


}



// === submit btn 1 === //
submit_flow_1.addEventListener('click',()=>{

    if (check.personflow1.IsValid()) {
        // see if all fields are finally done then move to next stage
        flow_1_error.classList.add('success_ball')
        submit_flow_1.disabled=true
    }
})



// === submit btn 2 === //
submit_flow_2.addEventListener('click',()=>{
    if (check.personflow2.calculateUtme()) {
        // see if all fields are finally done then move to next stage
        flow_2_error.classList.add('success_ball')
        submit_flow_2.disabled=true
    }

})


// === submit btn 3 === //
submit_flow_3.addEventListener('click',()=>{
    all_subjects.forEach((subject)=>{
        if (subject.value.length < 1 ) {
            flow_3_error.innerHTML = "Please Input All Required Subjects"
            flow_3_error.classList.add('error_box')
            // take away the error message after some time
            setTimeout(()=>{
                flow_3_error.classList.remove('error_box')
                flow_3_error.innerHTML = null
            },3000)
        }
        else{
            olevel.push(Number(subject.value))
            flow_3_error.classList.add('success_ball')
            submit_flow_3.disabled=true
            checkTotalScore()
        }

    })
})



function checkTotalScore() {
    let olevelMerit = olevel.reduce((subject, value)=>{
        return subject + value
    })

    candidate_store.finalScore = Math.round((olevelMerit / 50) * 30 + ( Number(candidate_store.jambScore) / 8) + Number(candidate_store.postUtmeScore))
   
    if (candidate_store.finalScore >= 80) {
        kick_out_message.innerHTML = `You Scores Is ${candidate_store.finalScore} You are on the Merit list`
        kick_out_board.classList.remove('gone')
    }
   else if (candidate_store.finalScore >= 75 || candidate_store.finalScore < 80) {
        kick_out_message.innerHTML = `You Scores Is ${candidate_store.finalScore} You are on the Concessionary list`
        kick_out_board.classList.remove('gone')
    }
    else if (candidate_store.finalScore >= 65 || candidate_store.finalScore < 75) {
        kick_out_message.innerHTML = `You Scores Is ${candidate_store.finalScore} You are on the VC list`
        kick_out_board.classList.remove('gone')
    }
    else{
        kick_out_message.innerHTML = `You Disqualifies ou did'nt reach our standard your Scores Is ${candidate_store.finalScore}`
        kick_out_board.classList.remove('gone')
    }
}