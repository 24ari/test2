'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ride = mongoose.model('Ride'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ride;

/**
 * Ride routes tests
 */
describe('Ride CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Ride
    user.save(function () {
      ride = {
        name: 'Ride name'
      };

      done();
    });
  });

  it('should be able to save a Ride if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ride
        agent.post('/api/rides')
          .send(ride)
          .expect(200)
          .end(function (rideSaveErr, rideSaveRes) {
            // Handle Ride save error
            if (rideSaveErr) {
              return done(rideSaveErr);
            }

            // Get a list of Rides
            agent.get('/api/rides')
              .end(function (ridesGetErr, ridesGetRes) {
                // Handle Rides save error
                if (ridesGetErr) {
                  return done(ridesGetErr);
                }

                // Get Rides list
                var rides = ridesGetRes.body;

                // Set assertions
                (rides[0].user._id).should.equal(userId);
                (rides[0].name).should.match('Ride name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ride if not logged in', function (done) {
    agent.post('/api/rides')
      .send(ride)
      .expect(403)
      .end(function (rideSaveErr, rideSaveRes) {
        // Call the assertion callback
        done(rideSaveErr);
      });
  });

  it('should not be able to save an Ride if no name is provided', function (done) {
    // Invalidate name field
    ride.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ride
        agent.post('/api/rides')
          .send(ride)
          .expect(400)
          .end(function (rideSaveErr, rideSaveRes) {
            // Set message assertion
            (rideSaveRes.body.message).should.match('Please fill Ride name');

            // Handle Ride save error
            done(rideSaveErr);
          });
      });
  });

  it('should be able to update an Ride if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ride
        agent.post('/api/rides')
          .send(ride)
          .expect(200)
          .end(function (rideSaveErr, rideSaveRes) {
            // Handle Ride save error
            if (rideSaveErr) {
              return done(rideSaveErr);
            }

            // Update Ride name
            ride.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ride
            agent.put('/api/rides/' + rideSaveRes.body._id)
              .send(ride)
              .expect(200)
              .end(function (rideUpdateErr, rideUpdateRes) {
                // Handle Ride update error
                if (rideUpdateErr) {
                  return done(rideUpdateErr);
                }

                // Set assertions
                (rideUpdateRes.body._id).should.equal(rideSaveRes.body._id);
                (rideUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Rides if not signed in', function (done) {
    // Create new Ride model instance
    var rideObj = new Ride(ride);

    // Save the ride
    rideObj.save(function () {
      // Request Rides
      request(app).get('/api/rides')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ride if not signed in', function (done) {
    // Create new Ride model instance
    var rideObj = new Ride(ride);

    // Save the Ride
    rideObj.save(function () {
      request(app).get('/api/rides/' + rideObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ride.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ride with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/rides/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ride is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ride which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ride
    request(app).get('/api/rides/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ride with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ride if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ride
        agent.post('/api/rides')
          .send(ride)
          .expect(200)
          .end(function (rideSaveErr, rideSaveRes) {
            // Handle Ride save error
            if (rideSaveErr) {
              return done(rideSaveErr);
            }

            // Delete an existing Ride
            agent.delete('/api/rides/' + rideSaveRes.body._id)
              .send(ride)
              .expect(200)
              .end(function (rideDeleteErr, rideDeleteRes) {
                // Handle ride error error
                if (rideDeleteErr) {
                  return done(rideDeleteErr);
                }

                // Set assertions
                (rideDeleteRes.body._id).should.equal(rideSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ride if not signed in', function (done) {
    // Set Ride user
    ride.user = user;

    // Create new Ride model instance
    var rideObj = new Ride(ride);

    // Save the Ride
    rideObj.save(function () {
      // Try deleting Ride
      request(app).delete('/api/rides/' + rideObj._id)
        .expect(403)
        .end(function (rideDeleteErr, rideDeleteRes) {
          // Set message assertion
          (rideDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ride error error
          done(rideDeleteErr);
        });

    });
  });

  it('should be able to get a single Ride that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Ride
          agent.post('/api/rides')
            .send(ride)
            .expect(200)
            .end(function (rideSaveErr, rideSaveRes) {
              // Handle Ride save error
              if (rideSaveErr) {
                return done(rideSaveErr);
              }

              // Set assertions on new Ride
              (rideSaveRes.body.name).should.equal(ride.name);
              should.exist(rideSaveRes.body.user);
              should.equal(rideSaveRes.body.user._id, orphanId);

              // force the Ride to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Ride
                    agent.get('/api/rides/' + rideSaveRes.body._id)
                      .expect(200)
                      .end(function (rideInfoErr, rideInfoRes) {
                        // Handle Ride error
                        if (rideInfoErr) {
                          return done(rideInfoErr);
                        }

                        // Set assertions
                        (rideInfoRes.body._id).should.equal(rideSaveRes.body._id);
                        (rideInfoRes.body.name).should.equal(ride.name);
                        should.equal(rideInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Ride.remove().exec(done);
    });
  });
});
