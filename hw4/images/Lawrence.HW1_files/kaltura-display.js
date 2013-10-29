/*
 * Copyright 2010 Unicon (R) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// http://jshint.com/
/*global jQuery: true, kaltura: true, mediaSelector: true, alert: true, confirm: true */
$(function(){
    
    /* 
     *  look through each of the div.kaltura-media elements that have embedded div.kaltura-media elements
     *  promote the embedded div.kaltura-media elements to the same level as the parent container
     *  if the embedded div.kaltura-media element is before the parent's image or non-blank text, 
     *  promote it before the parent; otherwise after the parent
     */
    var promoteImages = function(doc) {
        $(doc).find("div.kaltura-media:has(div.kaltura-media)").each(function() {
            var foundImage = false;
            
            // had to go native javascript in order to see the text node in context
            // with the other node types.  Newer versions of jQuery support "content()" function,
            // which solves this problem
            for (var i = 0; i < this.childNodes.length; i++) {
                var child = this.childNodes[i];
                if (child.nodeName === "IMG" || (child.nodeType === 3 && child.textContent.trim() !== "")) {
                    foundImage = true;
                } else if (child.nodeName === "DIV") {
                    if (!foundImage) {
                        $(child).insertBefore($(this));
                        i--;  // moving the child removes it from childNodes
                    } else {
                        $(child).insertAfter($(this));
                        i--;
                    } 
                }
            }
        });
    };
    
    var promoteText = function(doc) {
        $(doc).find("div.kaltura-media").each(function(idx, div) {
            var length = div.childNodes.length;
            for (var i = 0; i < length; i++) {
                var childNode = div.childNodes[i];
                if (childNode.nodeType === 3) { // text nodes only
                    $("<span>" + childNode.textContent + "</span>").insertAfter($(div));                    
                }
            }
        });
    };
    
    var displayKaltura = function(doc) {
        
        promoteImages(doc);
        promoteText(doc);
        
        // remove div's without embedded images
        $(doc).find("div.kaltura-media:not(:has(img))").remove();
        
        // find kaltura placeholder divs and process each one
        $(doc).find("div.kaltura-media").each(function(idx, div){

            // handle the id and type (or just the id if no type is set)
            var relData = $(this).attr("rel");
            var entryId = relData;
            var entryType = "video";
            if (relData.indexOf("::") > 0) {
                var parts = relData.split("::");
                if (parts.length > 0) {
                    entryId = parts[0];
                    if (parts.length > 1) {
                        entryType = parts[1];
                    }
                }
            }

            // TODO handle images differently
            if (entryType === "image") {
                // TODO do something here
            } else {
                // TODO handle the video/audio stuff here
            }

            // replace the contents of the placeholder div with an IFrame view of the content
            $(div).html('<iframe src="/kaltura/service/viewMedia.htm?entryId=' + entryId + '&entryType=' + entryType + '" height="400" width="520"/>');

        });
    };

    var findIframes = function(doc) {

        // find each IFrame in the current document
        $(doc).find("iframe").each(function(idx, iframe){

            // as each IFrame loads, process it
            $(iframe).load( function(){

                // get the document associated with this IFrame
                var window = this.contentDocument || this.contentWindow.document;

                // display any Kaltura content within this IFrame 
                displayKaltura(window);

                // process any nested IFrames
                findIframes(window);
            });

        });		
    };

    // on page load, find and process Kaltura media placeholders in each nested IFrame
    $(document).ready(function(){
        findIframes(this);
    });	

});
