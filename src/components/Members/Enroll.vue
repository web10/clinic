<template>
  <div>
    <v-form @submit.prevent="enrollUser">
    <h2 class="text-sm-left text-md-center"> Patient Enrollment Form </h2>
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="ma-2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Personal Information</v-toolbar-title>
          </v-toolbar>

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

        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Contact Information</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

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

    <v-divider></v-divider>

    <v-layout row wrap>
      <v-flex xs12 md6>

        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Emergency Contact 1 (Optional)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>

            <v-text-field
              v-model="user.emergContact1.firstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.lastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.relationship"
              label="Relationship to you"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.addressLine1"
              label="Address"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.addressLine2"
              label=""
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.addressCity"
              label="City"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.addressState"
              label="State"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.addressZip"
              label="Zip"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact1.phone"
              label="Phone Number"
            ></v-text-field>

          </v-card-text>
        </v-card>

        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Emergency Contact 2 (Optional)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.emergContact2.firstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.lastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.relationship"
              label="Relationship to you"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.addressLine1"
              label="Address"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.addressLine2"
              label=""
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.addressCity"
              label="City"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.addressState"
              label="State"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.addressZip"
              label="Zip"
            ></v-text-field>

            <v-text-field
              v-model="user.emergContact2.phone"
              label="Phone Number"
            ></v-text-field>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
    <h2 class="text-sm-left text-md-center ma-2"> Enroll Other Family Members </h2>
    <v-layout row wrap>
      <v-flex xs12 md6 Lg4>
        <v-card class="ma-2">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Additional Adult</v-toolbar-title>
          </v-toolbar>

          <v-card-text>

            <v-text-field
              v-model="user.familyAdult.firstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.lastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.middleInitial"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.dob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyAdult.gender"
              label="Gender"
            ></v-select>

            <v-text-field
              v-model="user.familyAdult.phoneCell"
              label="Cell Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.phoneWork"
              label="Work Phone"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.email"
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="user.familyAdult.occupation"
              label="Occupation"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Child #1</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.familyChild1.firstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1.lastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1.middleInitial"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild1.dob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyChild1.gender"
              label="Gender"
            ></v-select>
          </v-card-text>
        </v-card>

        <v-card class="ma-2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Child #2</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="user.familyChild2.firstName"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2.lastName"
              label="Last Name"
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2.middleInitial"
              label="M.I."
            ></v-text-field>

            <v-text-field
              v-model="user.familyChild2.dob"
              label="Date of Birth"
            ></v-text-field>

            <v-select
              :items="genders"
              v-model="user.familyChild2.gender"
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
        familyChild1: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dob: '',
          gender: ''
        },
        familyChild2: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dob: '',
          gender: ''
        },
        enrollmentCertifyTrue: '',
        enrollmentSigned: ''
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
