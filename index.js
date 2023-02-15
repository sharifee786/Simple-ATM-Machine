class customers {
    constructor() {
      this.url = "http://atm.alshumaal.com/";
    }
    setData(name, accNo, pin, balance) {
      this.name = name;
      this.account = accNo;
      this.pin = pin;
      this.balance = Number(balance);
    }
    getAccount() {
      return this.account;
    }
    getName() {
      return this.name;
    }
    getBalance() {
      return this.balance;
    }
    setBalance(balance) {
      this.balance = balance;
    }
    checkAccount(acc) {
      if (this.account == acc) {
        return true;
      } else {
        return false;
      }
    }
    getPin() {
      return this.pin;
    }
    async login(pin) {
      const options = {
        method: "POST",
        body: JSON.stringify({
          pin: pin, //for post method
        }),
      };
      try {
        let loginApi = await fetch(`${this.url}api/users/login`, options);
        if (loginApi.status == 200) {
          return loginApi.json();
        } else {
          return loginApi.json();
        }
      } catch (error) {
        return error;
      }
    }
    recieveamount(amount) {
      this.balance = this.balance + Number(amount);
    }
    deductamount(amount) {
      this.balance = this.balance - amount;
    }
    content() {
      let loginscreen = document.querySelector("#content");
      let logincontent = `<div class="form-group">
      <label for="">Enter Your Pin</label>
      <label for="" id="message"></label>
      <input type="password" name="" id="pin" class="form-control" />
    </div>
    <div class="form-group">
      <button class="btn btn-success btn-block" id="login">
        Enter
      </button>
    </div>`;
      loginscreen.innerHTML = logincontent;
      loginscreen.style.display = "block";
      let login = document.querySelector("#login");
      login.addEventListener("click", () => {
        let pin = document.querySelector("#pin").value;
        let userlogin = user.login(pin);
        userlogin.then((response) => {
          if (response.data == "Invalid Pin") {
            let message = document.querySelector("#message");
            message.innerHTML = "Invalid Pin";
            message.style.color = "red";
            setTimeout(() => {
              message.innerHTML = "";
            }, 2000);
          } else {
            let loginscreen = document.querySelector("#content");
            loginscreen.style.display = "none";
            console.log(response);
            user.setData(
              response.data.username,
              response.data.cardNumber,
              response.data.atmPin,
              response.data.currentBalance
            );
            user.showMenu();
          }
        });
      });
    }
    moneytransfer() {
      let Moneytransfer = document.querySelector("#moneytransfer");
    let TransContent = ` <h3>Transfer Amount</h3>
      <div class="form-group">
        <input type="number" id="transferaccount"  class="form-control" placeholder="Enter Account Number" />
        <button class="btn btn-primary btn-block" id="nextbtn"> Next </button>
        </div>
      <div id="transferMessage"></div>
      <div class="form-group">
      
      </div>
      <div id="nextpage" style="display:none;">
        <div class= "out">
        <h3>Title:</h3>
        <p id="Title">
        <h3>Acocunt Number:</h3>
        <p id="accountNo" ">
        </div>
        <div class="form-group">
         <input type="number" id="TranAmount"  class="form-control" placeholder="Enter Amount" />
          <button class="btn btn-primary btn-block" id="tranbtn">Transfer</button>
        <label id="TranMessage"></label>
        </div>
        <table class="table table-bordered"> <td>
        <button class="btn btn-success btn-block" id="inqbackmenu"> Menu</button>
        <td>
          <button class="btn btn-danger btn-block" id="inqlogout">Logout</button>
      </td></table>
      </div>
      `;
    Moneytransfer.innerHTML = TransContent;
    var tranAmount= document.querySelector("#TranAmount");
    var tranbtn = document.querySelector('#tranbtn');
    var TranMessage= document.querySelector('#TranMessage');
    var transferaccount = document.querySelector('#transferaccount');
    var nextbutton = document.querySelector("#nextbtn");
    nextbutton.addEventListener("click", () => {
      fetch(`http://atm.alshumaal.com/api/users/checkAccount?accNo=${transferaccount.value}`).then
      ((data) => {
        return data.json();
      }).then((response) => {
        let nextpage = document.querySelector('#nextpage');
        nextpage.style.display = 'block';
        document.querySelector("#Title").innerHTML = response.data.title;
        document.querySelector("#accountNo").innerHTML = response.data.accountNumber;
        tranbtn.addEventListener('click',()=>{
          
         let tranpay={
            accNo: response.data.accountNumber,
            amount: tranAmount.value,
            senderAcc: user.getAccount()
          }
          
   fetch(`http://atm.alshumaal.com/api/users/transferAmount`,{
            method: 'Post',
            body: JSON.stringify(tranpay)
          }).then((response)=>{
            TranMessage.innerHTML="Amount Transfered"
            return response.json();
          }).then((result)=>{
            console.log(result);
          })
        })
      })
    });
    let inqbackmenu = document.querySelector("#inqbackmenu");
      inqbackmenu.addEventListener("click", () => {
        Moneytransfer.innerHTML = "";
        this.showMenu();
      });
      let inqlogout = document.querySelector("#inqlogout");
      inqlogout.addEventListener("click", () => {
        Moneytransfer.innerHTML = "";
        this.content();
      });
    }
    logout() {
      let menuscreen = document.querySelector(".menu");
      menuscreen.innerHTML = "";
      this.content();
    }
    showMenu() {
      let menu = document.querySelector("#menu");
      let menuContent = `<h2>Menu</h2>
      <button id="accountinfo" class="btn btn-dark btn-block">Account Info</button>
      <button class="btn btn-dark btn-block" id="withdrawl">Amount Withdrawl</button>
      <button class="btn btn-dark btn-block" id="bal-inquiry">Balance Inquiry</button>
      <button class="btn btn-dark btn-block" id="transfermoney">Transfer Amount</button>
      <button class="btn btn-dark btn-block" id="moneydeposit">Deposite Amount</button>
      <button class="btn btn-dark btn-block" id="changepinn">Change Pin</button>
      <button id="logout" class="btn btn-danger btn-block">Log Out</button>`;
  
      menu.innerHTML = menuContent;
      var logout = document.querySelector("#logout");
      logout.addEventListener("click", () => {
        user.logout();
      });
      var accinfo = document.querySelector("#accountinfo");
      accinfo.addEventListener("click", () => {
        user.accountinfoscreen();
        user.removeMenu();
      });
      var balanceinquiry = document.querySelector("#bal-inquiry");
      balanceinquiry.addEventListener("click", () => {
        user.balanceinquiry();
      });
      var withdrawl = document.querySelector("#withdrawl");
      withdrawl.addEventListener("click", () => {
        user.removeMenu();
        user.cashwithdrawl();
      });
      var moneydeposit = document.querySelector("#moneydeposit");
      moneydeposit.addEventListener("click", () => {
        this.removeMenu();
        user.cashdeposit();
      });
      var transfermoney = document.querySelector("#transfermoney");
      transfermoney.addEventListener("click", () => {
        this.removeMenu();
        this.moneytransfer();
      });
      var changepinn = document.querySelector("#changepinn");
      changepinn.addEventListener("click", () => {
      this.removeMenu();
      this.changepassword();
      });
    }
    removeMenu() {
      let menu = document.querySelector("#menu");
      menu.innerHTML = "";
    }
    accountinfoscreen() {
      let accountinfoscreen = document.querySelector("#info");
      let showinfo = `<table class="table table-bordered" id="table">
      <thead>
        <h3>Account Information</h3>
      </thead>
      <tr>
        <th>Full Name</th>
        <td id="username"></td>
      </tr>
      <tr>
        <th>Account Number</th>
        <td id="useraccount"></td>
      </tr>
      <tr>
        <th>Total Balance</th>
        <td id="userbalance"></td>
      </tr>
      <tr>
        <td>
          <button class="btn btn-success btn-block" id="backmenu"> Menu</button>
          <td>
            <button class="btn btn-danger btn-block" id="logout2">Logout</button>
        </td>
        </td>
      </tr>
    </table>`;
      accountinfoscreen.innerHTML = showinfo;
      var backmenu = document.querySelector("#backmenu");
      backmenu.addEventListener("click", () => {
        user.backmenu();
      });
      var logoout2 = document.querySelector("#logout2");
      logoout2.addEventListener("click", () => {
        user.backlogout();
      });
      document.querySelector("#username").innerHTML = this.getName();
      document.querySelector("#useraccount").innerHTML = this.getAccount();
      document.querySelector("#userbalance").innerHTML = this.getBalance();
    }
    backmenu() {
      let accinfo = document.querySelector("#info");
      accinfo.innerHTML = "";
      this.showMenu();
    }
    backlogout() {
      this.content();
      let accinfo = document.querySelector("#info");
      accinfo.innerHTML = "";
      let login = document.querySelector("#login");
      login.addEventListener("click", () => {
        let pin = document.querySelector("#pin").value;
        let myloginscreen = new Promise((resolve, reject) => {
          if (user.login(pin)) {
            resolve("Successful");
          } else {
            reject("Invalid pin");
          }
        });
        myloginscreen
          .then((data) => {
            let message = document.querySelector("#content");
            // message.innerHTML = "Login Succesfull...";
            message.innerHTML = "";
            user.showMenu();
          })
          .catch((error) => {
            let message = document.querySelector("#message");
            message.innerHTML = error;
            message.style.color = "red";
            console.log("incorrect Pin");
            setTimeout(() => {
              message.innerHTML = " Try Again";
            }, 2000);
          });
      });
    }
    cashwithdrawl() {
      let cashwithdraw = document.querySelector(".cashwithdrawl");
      let withdrawdata = ` <h3>Amount Withdrawl</h3>
       <div class="form-group">
       <input type="number" id="withdrawinput"  class="form-control" placeholder="Enter Amount to Withdrawl" />
       <div id="cashMessage"></div>
       <button class="btn btn-primary btn-block" id="withdrawbutton">Withdrawl</button>
       </div>
       <table class="table table-bordered"> <td>
       <button class="btn btn-success btn-block" id="inqbackmenu">Menu</button>
       <td>
         <button class="btn btn-danger btn-block" id="inqlogout">Logout</button>
     </td></table>
      `;
      cashwithdraw.innerHTML = withdrawdata;
      let withdrawbutton = document.querySelector("#withdrawbutton");
      withdrawbutton.addEventListener("click", () => {
        let withdrawinput = document.querySelector("#withdrawinput");
  
        if (withdrawinput.value < 0 || withdrawinput.value == 0) {
          let depositMessage = document.querySelector("#cashMessage");
          let message = "Enter a Valid Amount";
          depositMessage.innerHTML = message;
          setTimeout(() => {
            message.innerHTML = "";
          }, 3000);
        } else {
          let mywithdrawscreen = new Promise((resolve, reject) => {
            if (withdrawinput.value % 500 == 0) {
              resolve("Successful");
            } else {
              reject("Invalid Amount! Amount Must be Multiple of 500");
            }
          });
          mywithdrawscreen
            .then((data) => {
              if (
                this.getBalance() >= 500 &&
                this.getBalance() >= withdrawinput.value
              ) {
                let withdrawApi = fetch(
                  `http://atm.alshumaal.com/api/users/withdrawBalance?pin=${user.getPin()}&amount=${
                    withdrawinput.value
                  }`
                );
  
                withdrawApi
                  .then((data) => {
                    let cashMessage = document.querySelector("#cashMessage");
                    let message =
                      "Successfulyy Withdrawn Rs " + withdrawinput.value;
  
                    cashMessage.innerHTML = message;
                    // this.balance = data.data.currentBalance;
                    return data.json();
                  })
                  .then((response) => {
                    this.setBalance(response.data.currentBalance);
  
                    // this.balance = data.data.currentBalance;
                  });
              } else {
                let message = document.querySelector("#cashMessage");
                message.innerHTML = "Amount is Insufficient";
              }
            })
            .catch((err) => {
              let cashMessage = document.querySelector("#cashMessage");
              let message = err;
              cashMessage.innerHTML = message;
            });
        }
      });
  
      let inqbackmenu = document.querySelector("#inqbackmenu");
      inqbackmenu.addEventListener("click", () => {
        let withdrawback = document.querySelector(".cashwithdrawl");
        withdrawback.innerHTML = "";
        this.showMenu();
      });
      let inqlogout = document.querySelector("#inqlogout");
      inqlogout.addEventListener("click", () => {
        let logout = document.querySelector(".cashwithdrawl");
        logout.innerHTML = "";
        this.content();
      });
    }
    cashdeposit() {
      let cashdeposit = document.querySelector("#cashdeposit");
      let depositcash = `<h3>Amount Deposit</h3>
     
      <input type="number" id="depositinput"  class="form-control" placeholder="Enter Amount" />
      <div id="DepositMessage"></div>
      <button class="btn btn-primary btn-block" id="depositbutton">Deposit Amount</button>
      <table class="table table-bordered"> <td>
       <button class="btn btn-success btn-block" id="inqbackmenu"> Menu</button>
       <td>
         <button class="btn btn-danger btn-block" id="inqlogout">Logout</button>
     </td></table>`;
      cashdeposit.innerHTML = depositcash;
      let depositbutton = document.querySelector("#depositbutton");
      depositbutton.addEventListener("click", () => {
        var depositinput = document.querySelector("#depositinput");
        if (depositinput.value == "" || depositinput.value == 0) {
          let depositMessage = document.querySelector("#DepositMessage");
          let message = "Enter a Valid Amount";
          depositMessage.innerHTML = message;
        } else {
          let depositcash = new Promise((resolve, reject) => {
            if (depositinput.value > 0) {
              resolve("Successfully Deposited Rs ");
            } else {
              reject("Amount Must Be Greater than 0");
            }
            let url = `http://atm.alshumaal.com/api/users/deposite`;
            let options = {
              method: "POST",
              body: JSON.stringify({
                amount: depositinput.value,
                accNo: this.getAccount(),
              }),
            };
            let depositdata = async () => {
              try {
                let depositapi = await fetch(url, options);
                let response = await depositapi.json();
                console.log(response);
              } catch (error) {
                console.log(error);
              }
            };
            depositdata();
          });
          depositcash
            .then((data) => {
              let depositMessage = document.querySelector("#DepositMessage");
              let message = data + Number(depositinput.value);
              depositMessage.innerHTML = message;
              var balanceadd = Number(depositinput.value);
              this.balance += balanceadd;
            })
            .catch((error) => {
              let cashMessage = document.querySelector("#DepositMessage");
              let message = error;
              cashMessage.innerHTML = message;
            });
        }

      });
      let inqbackmenu = document.querySelector("#inqbackmenu");
      inqbackmenu.addEventListener("click", () => {
        cashdeposit.innerHTML = "";
        this.showMenu();
      });
      let inqlogout = document.querySelector("#inqlogout");
      inqlogout.addEventListener("click", () => {
        cashdeposit.innerHTML = "";
        this.content();
      });
    }
    balanceinquiry() {
      this.removeMenu();
      let balanceinquiry = document.querySelector("#balanceinquiry");
      let balanceinqscreen = `
      <table class="table table-bordered" id="table2">
      <thead><h3>Amount Information</h3></thead>
      <tr>
        <th>Current Amount</th>
        <td id="balance"></td>
      </tr>
      <tr>
        <th>Available Amount</th>
        <td id="balancewithdraw"></td>
      </tr>
      <tr>
        <th>Amount Pending</th>
        <<td id="approval"></td>
      </tr>
      <td>
        <button class="btn btn-success btn-block" id="inqbackmenu"> Menu</button>
        <td>
          <button class="btn btn-danger btn-block" id="inqlogout">Logout</button>
      </td>
      </td>
    </table>`;
      balanceinquiry.innerHTML = balanceinqscreen;
      document.querySelector("#balance").innerHTML = this.getBalance();
      document.querySelector("#balancewithdraw").innerHTML = this.getBalance();
      document.querySelector("#approval").innerHTML = 0;
      var backmenu = document.querySelector("#inqbackmenu");
      backmenu.addEventListener("click", () => {
        let backmenu = document.querySelector("#balanceinquiry");
        backmenu.innerHTML = "";
        this.showMenu();
      });
      var logoout2 = document.querySelector("#inqlogout");
      logoout2.addEventListener("click", () => {
        let logoout2 = document.querySelector("#balanceinquiry");
        logoout2.innerHTML = "";
        user.backlogout();
      });
    }
    changepassword(){
      let mypin = document.querySelector("#pinme");
      let outputpin = ` <h3>Change pin</h3>
      <div class="form-group">
      <input type="number" id="oldpin"  class="form-control" placeholder="Enter Old Pin" />
      
      </div>
      <div class="form-group">
      <input type="number" id="newpin"  class="form-control" placeholder="Enter New Pin" />
      
      </div>
      <div class="form-group">
      <input type="number" id="repeatpin"  class="form-control" placeholder="Re-Enter New Pin" />
      <button class="btn btn-primary btn-block" id="change">Changed Pin</button>
      </div>
      <div id="displayemsg"></div>
      <table class="table table-bordered"> <td>
      <button class="btn btn-success btn-block" id="inqbackmenu">Menu</button>
      <td>
        <button class="btn btn-danger btn-block" id="inqlogout"> Logout</button>
    </td></table>`;
    mypin.innerHTML=outputpin;
    let changepas = document.querySelector("#change");
    changepas.addEventListener("click",()=>{
    let old = document.querySelector("#oldpin").value;
    if(old != this.pin){
      let displayemsg = document.querySelector("#displayemsg");
      displayemsg.innerHTML = "Old pin is wrong";
      document.querySelector("#displayemsg").style.color = "red";
    }
    else if(newpin.value != repeatpin.value ){
      let displayemsg = document.querySelector("#displayemsg");
      displayemsg.innerHTML = "New pin and re-type must be same.";
    }
    else{
     let url = `http://atm.alshumaal.com/api/users/changePin`;
     let options ={
      method: "POST",
      body: JSON.stringify({
        pin: newpin.value,
        accNo: this.getAccount(),
      }),
     };
     let apidata = async () => {
      try {
        let api = await fetch(url, options);
        let response = await api.json();
        console.log(response);
      }catch (error) {
        console.log(error);
      };
    };
    apidata();
    }
    });
    let inqbackmenu = document.querySelector("#inqbackmenu");
      inqbackmenu.addEventListener("click", () => {
        mypin.innerHTML = "";
        this.showMenu();
      });
      let inqlogout = document.querySelector("#inqlogout");
      inqlogout.addEventListener("click", () => {
        mypin.innerHTML = "";
        this.content();
      });
    }
    async getApi(url){
      try{
        const api = await fetch('${this.url}${url}');//('${this.url+url}')
        return api.json();
      }catch(error)
      {
        return error;
      }
    }
    async postApi(url, options){
      try{
        const api = await fetch('${this.url}${url}', options);
        return api.json();
      }catch(error)
      {
        return error;
      }
    }
  }
  let pin = 12345;
  let account = 12345678;
  let name = "Manan";
  let balance;
  let user = new customers(pin, account, name, balance);
  let user2 = new customers(2001, 11223344, "Sheraz", 5000);
  // let account2 = 11223344;
  // let pin2 = 2002;
  // let name2 = "Ali";
  // let balance2 = 70000;
  // let user2 = new customers(account2, name2, balance2);
  
  let login = document.querySelector("#login");
  login.addEventListener("click", () => {
    let pin = document.querySelector("#pin").value;
    let userlogin = user.login(pin);
    userlogin.then((response) => {
      if (response.data == "Invalid Pin") {
        let message = document.querySelector("#message");
        message.innerHTML = "Invalid Pin";
        message.style.color = "red";
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);
      } else {
        let loginscreen = document.querySelector("#content");
        loginscreen.style.display = "none";
        console.log(response);
        user.setData(
          response.data.username,
          response.data.cardNumber,
          response.data.atmPin,
          response.data.currentBalance
        );
        user.showMenu();
      }
    });
    // myloginscreen
    //   .then((data) => {
    //     let message = document.querySelector("#content");
    //     // message.innerHTML = "Login Succesfull...";
    //     message.innerHTML = "";
    //     user.showMenu();
    //     // let userData = JSON.stringify({
    //     //   name: user.getName(),
    //     //   accountNo: user.getAccount(),
    //     //   balance: user.getBalance(),
    //     // });
    //     //converting to js again from json
  
    //     // console.log(JSON.parse(userData));
    //   })
    //   .catch((error) => {
    //     let message = document.querySelector("#message");
    //     message.innerHTML = error;
    //     message.style.color = "red";
    //     console.log("incorrect Pin");
    //     setTimeout(() => {
    //       message.innerHTML = " Try Again";
    //     }, 2000);
    //   });
  });
  