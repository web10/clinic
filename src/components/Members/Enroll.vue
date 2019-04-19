<template>
  <div>
    <v-form @submit.prevent="enrollUser">
    <h2 class="text-sm-left text-md-center"> Patient Enrollment Form </h2>
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="ma-2" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Personal Information</h3>
          </v-card-title>

          <v-card-text>

            <v-text-field
              v-model="user.firstName"
              label="First Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.lastName"
              label= "Last Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.middleInitial"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.dob"
              label="Date of Birth"
              required
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.gender"
              label="Gender"
            ></v-select>

            <v-text-field
              v-model="user.occupation"
              label="Occupation"
            ></v-text-field>

            <v-text-field
              v-model="user.preferredPharmacy"
              label="Preferred pharmacy name and location"
            ></v-text-field>

          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card class="ma-2" height="100%">

          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Contact Information</h3>
          </v-card-title>

          <v-card-text>

            <v-text-field
              v-model="user.addressLine1"
              label="Address"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.addressLine2"
              label=""
            ></v-text-field>

            <v-text-field
              v-model="user.addressCity"
              label="City"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.addressState"
              label="State"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.addressZip"
              label="Zip"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.phoneHome"
              label="Home Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.phoneCell"
              label="Cell Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.phoneWork"
              label="Work Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              label="Email"
              required
            ></v-text-field>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-divider></v-divider>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6>

        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Emergency Contact 1 (Optional)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>

            <v-text-field
              v-model="user.emergContact1FirstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1LastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1Relationship"
              label="Relationship to you"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1AddressLine1"
              label="Address"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1AddressLine2"
              label=""
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1AddressCity"
              label="City"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1AddressState"
              label="State"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1AddressZip"
              label="Zip"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1Phone"
              label="Phone Number"
            ></v-text-field>

          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Emergency Contact 2 (Optional)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.emergContact2FirstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2LastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2Relationship"
              label="Relationship to you"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2AddressLine1"
              label="Address"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2AddressLine2"
              label=""
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2AddressCity"
              label="City"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2AddressState"
              label="State"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2AddressZip"
              label="Zip"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2Phone"
              label="Phone Number"
            ></v-text-field>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
    <h2 class="text-sm-left text-md-center ma-2"> Enroll Other Family Members </h2>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Additional Adult</v-toolbar-title>
          </v-toolbar>

          <v-card-text>

            <v-text-field
              v-model="user.familyAdultFirstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultLastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultMI"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultDob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyAdultGender"
              label="Gender"
            ></v-select>

            <v-text-field
              v-model="user.familyAdultPhoneCell"
              label="Cell Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultPhoneWork"
              label="Work Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultEmail"
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdultOccupation"
              label="Occupation"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg4>
        <v-card class="ma-2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Child #1</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.familyChild1FirstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1LastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1MI"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1Dob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyChild1Gender"
              label="Gender"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg4>
        <v-card class="ma-2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Child #2</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.familyChild2FirstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2LastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2MI"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2Dob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyChild2Gender"
              label="Gender"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-checkbox
      v-model="user.enrollmentCertifyTrue"
      label="I certify that all the information provided by me on this form is true and correct."
    ></v-checkbox>
    <v-text-field
      v-model="user.enrollmentSigned"
      label="Enter your name to confirm"
    ></v-text-field>
    <v-btn type="submit" color="success" class="ma-2" justify-center>Submit</v-btn>
  </v-container>
  </v-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Enroll',
  data() {
    return {
      genders: [
        'Male',
        'Female',
        'Other'
      ],
      user: {
        firstName: '',
        lastName: '',
        gender: '',
        middleInitial: '',
        dob: '',
        occupation: '',
        preferredPharmacy: '',
        addressLine1: '',
        addressLine2: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        phoneHome: '',
        phoneCell: '',
        phoneWork: '',
        email: '',
        /*
        emergContact1: {
          firstName: '',
          lastName: '',
          relationship: '',
          addressLine1: '',
          addressLine2: '',
          addressCity: '',
          addressState: '',
          addressZip: '',
          phone: ''
        },
        */
        emergContact1FirstName: '',
        emergContact1LastName: '',
        emergContact1Relationship: '',
        emergContact1AddressLine1: '',
        emergContact1AddressLine2: '',
        emergContact1AddressCity: '',
        emergContact1AddressState: '',
        emergContact1AddressZip: '',
        emergContact1Phone: '',
        /*
        emergContact2: {
          firstName: '',
          lastName: '',
          relationship: '',
          addressLine1: '',
          addressLine2: '',
          addressCity: '',
          addressState: '',
          addressZip: '',
          phone: ''
        },
        */
        emergContact2FirstName: '',
        emergContact2LastName: '',
        emergContact2Relationship: '',
        emergContact2AddressLine1: '',
        emergContact2AddressLine2: '',
        emergContact2AddressCity: '',
        emergContact2AddressState: '',
        emergContact2AddressZip: '',
        emergContact2Phone: '',
        /*
        familyAdult: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dob: '',
          gender: '',
          phoneCell: '',
          phoneWork: '',
          email: '',
          occupation: ''
        },
        */
        familyAdultFirstName: '',
        familyAdultLastName: '',
        familyAdultMI: '',
        familyAdultDob: '',
        familyAdultGender: '',
        familyAdultPhoneCell: '',
        familyAdultPhoneWork: '',
        familyAdultEmail: '',
        familyAdultOccupation: '',
        /*
        familyChild1: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dob: '',
          gender: ''
        },
        */
        familyChild1FirstName: '',
        familyChild1LastName: '',
        familyChild1MI: '',
        familyChild1Dob: '',
        familyChild1Gender: '',
        /*
        familyChild2: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dob: '',
          gender: ''
        },
        */
        familyChild2FirstName: '',
        familyChild2LastName: '',
        familyChild2MI: '',
        familyChild2Dob: '',
        familyChild2Gender: '',
        enrollmentCertifyTrue: '',
        enrollmentSigned: '',
        enrollmentDate: ''
        //need to add timestamp in code
      }
    }
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    enrollUser () {
      this.$store.dispatch('updateUser', this.user)
    }
  },
  watch: {
    getUser (val) {
      if (val) {
        this.user = this.getUser
      }
    }
  },
  created () {
    // on component create - load users data from DB
    if (this.getUser) {
      this.user = this.getUser
    }
  }
}
</script>
