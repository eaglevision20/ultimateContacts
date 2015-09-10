import Ember from 'ember';
import EmberLoader from 'ember-uploader/uploader';
import FileField from 'ember-uploader/file-field';
import S3 from 'ember-uploader/s3';
import config from './../../../config/environment';

export default FileField.extend({
  baseURL: 'http://staging.modelhomemobile.com' + '/api/s3',
  owner: '',
  link: '',
  progress: null,
  url: function () {
    return this.get('baseURL') + '/' + 'contactsSite' + '/upload';
  }.property('owner'),

  filesDidChange: (function() {
    var self = this;
    var uploadUrl = this.get('url');
    var files = this.get('files');

    var uploader = S3.create({
      url: uploadUrl
    });

    uploader.on('progress', function(e) {
      // Handle progress changes
      self.set('progress',e.percent);
    });

    uploader.on('didUpload', function(response) {
      // S3 will return XML with url
      var uploadedUrl = $(response).find('Location')[0].textContent;
      uploadedUrl = decodeURIComponent(uploadedUrl); // => http://yourbucket.s3.amazonaws.com/file.png
      console.log("Path To image:", uploadedUrl);
      self.set('link', uploadedUrl);
      self.set('progress', null);
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]); // Uploader will send a sign request then upload to S3
    }
  }).observes('files')
});