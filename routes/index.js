const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const { check, validationResult } = require('express-validator/check');
const ObjectId = mongoose.Types.ObjectId;

router.get('/', function(req, res, next) {
  res.json({
    api: 'v1'
  });
});

// gönderilen boylam ve enlem bilgisine göre en yakın koordinatta olan 3 driver bilgisi döner
router.post('/ride', [
  check('latitude')
    .isFloat().withMessage('latitude field blank')
    .trim(),
  check('longitude')
    .isFloat().withMessage('longitude field blank')
    .trim()
], async function(req, res, next) {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.mapped()
      });
    }

    const drivers = await Driver.aggregate(
                            [
                              {
                                  "$geoNear": {
                                    "near": {
                                        "type": "Point",
                                        "coordinates": [
                                          parseFloat(req.body.latitude), parseFloat(req.body.longitude)
                                        ]
                                    },
                                    "distanceField": "distance",
                                    "spherical": true,
                                    "maxDistance": 10000
                                }
                              }
                            ]
                          )
                          .sort({
                            distance: -1
                          })
                          .limit(3);

    res.json({
      success: true,
      payload: drivers
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

});

module.exports = router;
