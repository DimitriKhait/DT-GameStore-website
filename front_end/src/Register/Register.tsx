import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../User/User";

import "./Register.css";

export function Register() {
  // **************** GLOBAL CONFIGURATIONS ***************

  const navigate = useNavigate();
  let orangeColor = "#FFA500";
  let redColor = "red";
  let greenColor = "green";
  let passLength = 8;

  //submitClicked is a function sent from App.
  // let { submitClicked } = { ...props };

  //validating each of the relevent fields
  //if there is a problem with the validation mark that input as invalidInput class (it will be colored in red).
  let validateName = (idString: string) => {
    //same function for fname and lname
    //validating each field length is at least 3
    let name: HTMLInputElement | null = document.querySelector(`#${idString}`);
    //making sure name isnt null
    if (name) {
      if (name.value.length === 0) {
        name.classList.add("emptyInput");
      } else if (name.value.length < 3) {
        name.classList.add("invalidInput");
        name.classList.remove("emptyInput");
      } else {
        //if there isnt any problem with the validation remove the empty class and the invalid class
        name.classList.remove("invalidInput");
        name.classList.remove("emptyInput");
      }
    }
  };

  let validateEmail = (idString: string) => {
    let email: HTMLInputElement | null = document.querySelector(`#${idString}`);
    const regex = new RegExp("^[A-Za-z0-9]+@[A-Za-z]+.com$");
    if (email) {
      if (email.value.length === 0) {
        email.classList.add("emptyInput");
      } else if (!regex.test(email.value)) {
        email.classList.add("invalidInput");
        email.classList.remove("emptyInput");
      } else {
        email.classList.remove("invalidInput");
        email.classList.remove("emptyInput");
      }
    }
  };

  let validatePassword = () => {
    let password: HTMLInputElement | null = document.querySelector("#password");
    let cPassword: HTMLInputElement | null =
      document.querySelector("#confirmPassword");
    let passMatched = document.querySelector("#passwordMatched") as HTMLElement;

    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (password) {
      if (password.value.length === 0) {
        password.classList.add("emptyInput");
      }
      //checking password contains regex
      else if (!regex.test(password.value)) {
        password.classList.add("invalidInput");
        password.classList.remove("emptyInput");
      } else {
        password.classList.remove("invalidInput");
        if (cPassword) {
          password.classList.remove("invalidInput");
          password.classList.remove("emptyInput");
          if (cPassword.value.length === 0) {
            cPassword.classList.add("emptyInput");
          } else if (password.value !== cPassword.value) {
            cPassword.classList.add("invalidInput");
            cPassword.classList.remove("emptyInput");
            passMatched.style.color = redColor;
            passMatched.innerHTML = passMatched.innerHTML.replace("✓", "✗");
          } else {
            passMatched.style.color = greenColor;
            cPassword.classList.remove("invalidInput");
            cPassword.classList.remove("emptyInput");
            passMatched.innerHTML = passMatched.innerHTML.replace("✗", "✓");
          }
        }
      }
    }
  };

  useEffect(() => {
    //----------will add '-' in the right places

    let checkPass: HTMLInputElement | null =
      document.querySelector("#password");

    if (checkPass) {
      checkPass.addEventListener("input", () => {
        let password: string = (
          document.querySelector("#password") as HTMLInputElement
        ).value;

        let passwordLength = document.querySelector(
          "#passwordLength"
        ) as HTMLElement;
        let passwordUpper = document.querySelector(
          "#passwordUpper"
        ) as HTMLElement;
        let passwordLower = document.querySelector(
          "#passwordLower"
        ) as HTMLElement;
        let passwordSpecial = document.querySelector(
          "#passwordSpecial"
        ) as HTMLElement;
        let passwordDigit = document.querySelector(
          "#passwordDigit"
        ) as HTMLElement;

        let flags = [false, false, false, false];
        let vldContext: HTMLElement[] = [
          passwordUpper,
          passwordLower,
          passwordSpecial,
          passwordDigit,
        ];

        for (let i = 0; i < flags.length; i++) {
          vldContext[i].style.color = orangeColor;
          vldContext[i].innerHTML = vldContext[i].innerHTML.replace("✓", "✗");
        }

        if (password.length >= passLength) {
          passwordLength.innerHTML = passwordLength.innerHTML.replace("✗", "✓");
          passwordLength.style.color = greenColor;
        } else {
          passwordLength.innerHTML = passwordLength.innerHTML.replace("✓", "✗");
        }

        for (let i = 0; i < password.length; i++) {
          if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
            flags[0] = true;
          }

          if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
            flags[1] = true;
          }

          if (password.charCodeAt(i) >= 33 && password.charCodeAt(i) <= 47) {
            flags[2] = true;
          }

          if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
            flags[3] = true;
          }
        }

        for (let i = 0; i < flags.length; i++) {
          if (flags[i]) {
            vldContext[i].innerHTML = vldContext[i].innerHTML.replace("✗", "✓");
            vldContext[i].style.color = greenColor;
          }
        }
      });
    }
  });

  let birthdaySelected = () => {
    (document.querySelector("#day") as HTMLInputElement).disabled = false;
    (document.querySelector("#year") as HTMLInputElement).disabled = false;
  };

  let checkDay = () => {
    let month = document.querySelector("#month") as HTMLInputElement;
    let day = document.querySelector("#day") as HTMLInputElement;

    if (month) {
      if (month.value !== "0") {
        month.classList.remove("emptyInput");

        if (day.value.length === 0) {
          day.classList.add("emptyInput");
        } else if (month.value === "february") {
          if (parseInt(day.value) >= 1 && parseInt(day.value) <= 29) {
            day.classList.remove("invalidInput");
            day.classList.remove("emptyInput");
          } else {
            day.classList.add("invalidInput");
            day.classList.remove("emptyInput");
          }
        } else {
          // not february as month value
          if (parseInt(day.value) >= 1 && parseInt(day.value) <= 31) {
            day.classList.remove("invalidInput");
            day.classList.remove("emptyInput");
          } else {
            day.classList.add("invalidInput");
            day.classList.remove("emptyInput");
          }
        }
      }
    }
  };

  let checkYear = () => {
    let month = document.querySelector("#month") as HTMLInputElement;
    let year = document.querySelector("#year") as HTMLInputElement;

    if (month) {
      if (month.value !== "0") {
        if (year.value.length === 0) {
          year.classList.add("emptyInput");
        } else if (
          parseInt(year.value) >= 1919 &&
          parseInt(year.value) <= 2021
        ) {
          year.classList.remove("invalidInput");
          year.classList.remove("emptyInput");
        } else {
          year.classList.add("invalidInput");
          year.classList.remove("emptyInput");
        }
      }
    }
  };

  let genderSelected = () => {
    let gender = document.querySelector("#gender") as HTMLInputElement;

    if (gender.value !== "0") {
      gender.classList.remove("emptyInput");
    }
  };

  let validatePhone = () => {
    const regex = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
    let phone = document.querySelector("#phone") as HTMLInputElement;

    if (phone?.value.length) {
      const newPhone = phone?.value.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
      phone.value = newPhone;
    }

    if (phone) {
      if (phone.value.length === 0) {
        phone.classList.add("emptyInput");
      } else if (!regex.test(phone.value)) {
        phone.classList.add("invalidInput");
        phone.classList.remove("emptyInput");
      } else {
        phone.classList.remove("invalidInput");
        phone.classList.remove("emptyInput");
      }
    }
  };

  let submitClick = () => {
    let invalidFields = document.querySelectorAll(".invalidInput");
    let emptyFields = document.querySelectorAll(".emptyInput");
    // console.log(emptyFields.length);
    // console.log(invalidFields.length);

    if (emptyFields.length === 0 && invalidFields.length === 0) {
      let tempUser: User = {
        fname: (document.querySelector("#fname") as HTMLInputElement).value,

        lname: (document.querySelector("#lname") as HTMLInputElement).value,

        email: (document.querySelector("#email") as HTMLInputElement).value,

        pwd: (document.querySelector("#password") as HTMLInputElement).value,

        birthdate:
          (document.querySelector("#day") as HTMLInputElement).value +
          "/" +
          (document.querySelector("#month") as HTMLInputElement).value +
          "/" +
          (document.querySelector("#year") as HTMLInputElement).value,

        gender: (document.querySelector("#gender") as HTMLInputElement).value,

        mobilePhone: (document.querySelector("#phone") as HTMLInputElement)
          .value,
      };

      axios({
        method: "post",
        url: "https://localhost:7210/api/App_users",
        data: tempUser,
      })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      alert("user was added to database");
      navigate(`/login`);
    }
  };

  return (
    <div className="minHeightClass">
      <h1 className="title">Register</h1>
      <form
        // action="https://localhost:7210/api/App_users"
        id="registerForm"
        // method="POST"
      >
        {/* <!-- NAME LABEL&INPUT --> */}
        <label>Name</label>
        <div id="nameDiv">
          <input
            className="emptyInput"
            type="text"
            id="fname"
            name="fname"
            placeholder="First"
            required
            onBlur={() => {
              validateName("fname");
            }}
          />
          <input
            className="emptyInput"
            type="text"
            id="lname"
            name="lname"
            placeholder="Last"
            required
            onBlur={() => {
              validateName("lname");
            }}
          />
        </div>

        {/* <!-- USERNAME LABEL&INPUT --> */}
        <label>Choose your username</label>
        <input
          className="emptyInput"
          type="email"
          id="email"
          name="email"
          placeholder="@gmail"
          required
          onBlur={() => {
            validateEmail("email");
          }}
        />

        {/* <!-- PASSWORD LABEL&INPUT --> */}
        <label>Create a password</label>
        <input
          className="emptyInput"
          type="password"
          id="password"
          name="password"
          required
          onChange={() => {
            validatePassword();
          }}
        />
        <div>
          <div className="instructions" id="passwordLength">
            ✗ at least 8 characters
          </div>
          <div className="instructions" id="passwordUpper">
            ✗ at least one UPPER case
          </div>
          <div className="instructions" id="passwordLower">
            ✗ at least one lower case
          </div>
          <div className="instructions" id="passwordSpecial">
            ✗ a special character (~!@#$%^&*()_+)
          </div>
          <div className="instructions" id="passwordDigit">
            ✗ at least one digit (0-9)
          </div>
          <div className="instructions" id="passwordMatched">
            ✗ password must match
          </div>
        </div>

        {/* <!-- PASSWORD-CONFIRM LABEL&INPUT --> */}
        <label>Confirm your password</label>
        <input
          className="emptyInput"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          onChange={() => {
            validatePassword();
          }}
        />

        {/* <!-- BIRTHDAY (month/day/year) LABEL&INPUT --> */}
        <label>Birthday</label>
        <div id="birthDiv">
          <select
            name="month"
            id="month"
            onChange={birthdaySelected}
            className="emptyInput"
            required
            defaultValue="0"
          >
            <option value="0" disabled>
              Month
            </option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>

          <input
            type="number"
            min="1"
            max="31"
            step="1"
            id="day"
            name="day"
            disabled
            placeholder="Day"
            required
            className="emptyInput"
            onBlur={checkDay}
          />
          <input
            type="number"
            min="1919"
            max="2021"
            step="1"
            id="year"
            name="year"
            disabled
            placeholder="Year"
            required
            className="emptyInput"
            onBlur={checkYear}
          />
        </div>

        {/* <!-- GENDER LABEL&INPUT --> */}
        <label>Gender</label>
        <select
          name="gender"
          id="gender"
          defaultValue="0"
          className="emptyInput"
          required
          onChange={genderSelected}
        >
          <option value="0" disabled>
            I am...
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* <!-- PHONE LABEL&INPUT --> */}
        <label>Mobile Phone</label>
        <input
          className="emptyInput"
          id="phone"
          name="phone"
          type="tel"
          maxLength={12}
          required
          onChange={validatePhone}
        />

        {/* <!-- SUBMIT INPUT --> */}
        <div id="submitBtn">
          <input
            id="submit"
            type="button"
            value="Submit"
            onClick={submitClick}
          />
        </div>
      </form>
    </div>
  );
}
