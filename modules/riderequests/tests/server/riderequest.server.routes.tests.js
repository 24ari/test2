'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Riderequest = mongoose.model('Riderequest'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  riderequest;

/**
 * Riderequest routes tests
 */
describe('Riderequest CRUD tests', function () {

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

    // Save a user to the test db and create new Riderequest
    user.save(function () {
      riderequest = {
        name: 'Riderequest name'
      };

      done();
    });
  });

  it('should be able to save a Riderequest if logged in', function (done) {
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

        // Save a new Riderequest
        agent.post('/api/riderequests')
          .send(riderequest)
          .expect(200)
          .end(function (riderequestSaveErr, riderequestSaveRes) {
            // Handle Riderequest save error
            if (riderequestSaveErr) {
              return done(riderequestSaveErr);
            }

            // Get a list of Riderequests
            agent.get('/api/riderequests')
              .end(function (riderequestsGetErr, riderequestsGetRes) {
                // Handle Riderequests save error
                if (riderequestsGetErr) {
                  return done(riderequestsGetErr);
                }

                // Get Riderequests list
                var riderequests = riderequestsGetRes.body;

                // Set assertions
                (riderequests[0].user._id).should.equal(userId);
                (riderequests[0].name).should.match('Riderequest name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Riderequest if not logged in', function (done) {
    agent.post('/api/riderequests')
      .send(riderequest)
      .expect(403)
      .end(function (riderequestSaveErr, riderequestSaveRes) {
        // Call the assertion callback
        done(riderequestSaveErr);
      });
  });

  it('should not be able to save an Riderequest if no name is provided', function (done) {
    // Invalidate name field
    riderequest.name = '';

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

        // Save a new Riderequest
        agent.post('/api/riderequests')
          .send(riderequest)
          .expect(400)
          .end(function (riderequestSaveErr, riderequestSaveRes) {
            // Set message assertion
            (riderequestSaveRes.body.message).should.match('Please fill Riderequest name');

            // Handle Riderequest save error
            done(riderequestSaveErr);
          });
      });
  });

  it('should be able to update an Riderequest if signed in', function (done) {
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

        // Save a new Riderequest
        agent.post('/api/riderequests')
          .send(riderequest)
          .expect(200)
          .end(function (riderequestSaveErr, riderequestSaveRes) {
            // Handle Riderequest save error
            if (riderequestSaveErr) {
              return done(riderequestSaveErr);
            }

            // Update Riderequest name
            riderequest.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Riderequest
            agent.put('/api/riderequests/' + riderequestSaveRes.body._id)
              .send(riderequest)
              .expect(200)
              .end(function (riderequestUpdateErr, riderequestUpdateRes) {
                // Handle Riderequest update error
                if (riderequestUpdateErr) {
                  return done(riderequestUpdateErr);
                }

                // Set assertions
                (riderequestUpdateRes.body._id).should.equal(riderequestSaveRes.body._id);
                (riderequestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Riderequests if not signed in', function (done) {
    // Create new Riderequest model instance
    var riderequestObj = new Riderequest(riderequest);

    // Save the riderequest
    riderequestObj.save(function () {
      // Request Riderequests
      request(app).get('/api/riderequests')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Riderequest if not signed in', function (done) {
    // Create new Riderequest model instance
    var riderequestObj = new Riderequest(riderequest);

    // Save the Riderequest
    riderequestObj.save(function () {
      request(app).get('/api/riderequests/' + riderequestObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', riderequest.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Riderequest with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/riderequests/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Riderequest is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Riderequest which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Riderequest
    request(app).get('/api/riderequests/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Riderequest with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Riderequest if signed in', function (done) {
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

        // Save a new Riderequest
        agent.post('/api/riderequests')
          .send(riderequest)
          .expect(200)
          .end(function (riderequestSaveErr, riderequestSaveRes) {
            // Handle Riderequest save error
            if (riderequestSaveErr) {
              return done(riderequestSaveErr);
            }

            // Delete an existing Riderequest
            agent.delete('/api/riderequests/' + riderequestSaveRes.body._id)
              .send(riderequest)
              .expect(200)
              .end(function (riderequestDeleteErr, riderequestDeleteRes) {
                // Handle riderequest error error
                if (riderequestDeleteErr) {
                  return done(riderequestDeleteErr);
                }

                // Set assertions
                (riderequestDeleteRes.body._id).should.equal(riderequestSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Riderequest if not signed in', function (done) {
    // Set Riderequest user
    riderequest.user = user;

    // Create new Riderequest model instance
    var riderequestObj = new Riderequest(riderequest);

    // Save the Riderequest
    riderequestObj.save(function () {
      // Try deleting Riderequest
      request(app).delete('/api/riderequests/' + riderequestObj._id)
        .expect(403)
        .end(function (riderequestDeleteErr, riderequestDeleteRes) {
          // Set message assertion
          (riderequestDeleteRes.body.message).should.match('User is not authorized');

          // Handle Riderequest error error
          done(riderequestDeleteErr);
        });

    });
  });

  it('should be able to get a single Riderequest that has an orphaned user reference', function (done) {
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

          // Save a new Riderequest
          agent.post('/api/riderequests')
            .send(riderequest)
            .expect(200)
            .end(function (riderequestSaveErr, riderequestSaveRes) {
              // Handle Riderequest save error
              if (riderequestSaveErr) {
                return done(riderequestSaveErr);
              }

              // Set assertions on new Riderequest
              (riderequestSaveRes.body.name).should.equal(riderequest.name);
              should.exist(riderequestSaveRes.body.user);
              should.equal(riderequestSaveRes.body.user._id, orphanId);

              // force the Riderequest to have an orphaned user reference
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

                    // Get the Riderequest
                    agent.get('/api/riderequests/' + riderequestSaveRes.body._id)
                      .expect(200)
                      .end(function (riderequestInfoErr, riderequestInfoRes) {
                        // Handle Riderequest error
                        if (riderequestInfoErr) {
                          return done(riderequestInfoErr);
                        }

                        // Set assertions
                        (riderequestInfoRes.body._id).should.equal(riderequestSaveRes.body._id);
                        (riderequestInfoRes.body.name).should.equal(riderequest.name);
                        should.equal(riderequestInfoRes.body.user, undefined);

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
      Riderequest.remove().exec(done);
    });
  });
});
