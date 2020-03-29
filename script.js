
//             //we wrote this : )
//         function calculatepriceproportion() {
// //           var amount = document.getElementById('money').value;

// //           var percentages = piechart.getAllSliceSizePercentages();
          
//           console.log("here");
          
//           var medres = 3;
//           var lfortunate = 5;
//           var locbus = 4;
          
          
//           document.getElementById("medres").value = 3;
//           document.getElementById("lfortunate").value = 4;
//           document.getElementById("locbus").value = 5;
          
          
//           // console.log(percentages);
          
         


//         }

// example.js
const test = document.querySelector('#maney');
console.log(test);
(function(){

    //IE9+ http://youmightnotneedjquery.com/
    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(setupPieChart);
  

  

    function setupPieChart() {


        var dimensions = ['Medical Research', 'The Less Fortunate',  'Local Businesses']; //knuth fishery yates was used here previously
        var randomProportions = [33.33, 33.33, 33.33];//generateRandomProportions(dimensions.length, 0.05);
        var proportions = dimensions.map(function(d,i) { return {
            label: d,
            proportion: randomProportions[i], 

            collapsed: false,
            format: {
               //color: "#6dd020",
                label: d.charAt(0).toUpperCase() + d.slice(1) // capitalise first letter
            }
          
        }});


        var setup = {
            canvas: document.getElementById('piechart'),
            radius: 0.9,
            collapsing: true,
            proportions: proportions ,
      
            drawSegment: drawSegmentOutlineOnly,
            onchange: onPieChartChange
        };
      console.log("proportions"  + proportions);
      
          var setup2 = {canvas: document.getElementById('piechart'), 
                    radius: 0.9,
                    collapsing: true,
                    proportions: [
        { proportion: 1, format: { color: "#81a2da", label: 'Medical Research'}},
        { proportion: 1, format: { color: "#aed091", label: 'Less Fortunate'}},
        { proportion: 1, format: { color: "#f9e58b", label: 'Local Community'}}
       ],
                      // drawSegment: drawSegmentOutlineOnly,
            onchange: onPieChartChange};
   

       var newPie = new DraggablePiechart(setup2)
        

     
//   var newPie2 = new DraggablePiechart({
// 	        canvas: document.getElementById('piechart2'), 
// 	        proportions: proportions
//         });
      
        function drawSegmentOutlineOnly(context, piechart, centerX, centerY, radius, startingAngle, arcSize, format, collapsed) {

            if (collapsed) { return; }

            // Draw segment
            context.save();
            var endingAngle = startingAngle + arcSize;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
            context.closePath();

            context.fillStyle = '#f5f5f5';
            context.fill();
            context.stroke();
            context.restore();

            // Draw label on top
            context.save();
            context.translate(centerX, centerY);
            context.rotate(startingAngle);

            var fontSize = Math.floor(context.canvas.height / 25);
            var dx = radius - fontSize;
            var dy = centerY / 10;

            context.textAlign = "right";
            context.font = fontSize + "pt Helvetica";
            context.fillText(format.label, dx, dy);
            context.restore();
        }

        function onPieChartChange(piechart) {

            var table = document.getElementById('proportions-table');
            var percentages = piechart.getAllSliceSizePercentages();
          
            //test
            
            // console.log("percentages");
            // console.log(percentages);
            //


            var labelsRow = '<tr>';
            var propsRow = '<tr>';
            for(var i = 0; i < proportions.length; i += 1) {
                labelsRow += '<th>' + proportions[i].format.label + '</th>';

                var v = '<var>' + percentages[i].toFixed(0) + '%</var>';
                var plus = '<div id="plu-' + dimensions[i] + '" class="adjust-button" data-i="' + i + '" data-d="-1">&#43;</div>';
                var minus = '<div id="min-' + dimensions[i] + '" class="adjust-button" data-i="' + i + '" data-d="1">&#8722;</div>';
                propsRow += '<td>' + v + plus + minus + '</td>';
            }
            labelsRow += '</tr>';
            propsRow += '</tr>';

            table.innerHTML = labelsRow + propsRow;

            var adjust = document.getElementsByClassName("adjust-button");

            function adjustClick(e) {
                var i = this.getAttribute('data-i');
                var d = this.getAttribute('data-d');

                piechart.moveAngle(i, (d * 0.1));
            }

            for (i = 0; i < adjust.length; i++) {
                adjust[i].addEventListener('click', adjustClick);
            }
          
          
            test.addEventListener('submit', (e) => {


              e.preventDefault();

        //   console.log('there');
              test.medres.value = ((percentages[0] * test.donate.value)/100).toFixed(2);
              test.lfortunate.value = ((percentages[1] * test.donate.value)/100).toFixed(2);
              test.locbus.value = ((percentages[2] * test.donate.value)/100).toFixed(2);
           // console.log(test.donate.value);

        });

        }
      
//         //we wrote this : )
//         function calculatepriceproportion() {
// //           var amount = document.getElementById('money').value;

// //           var percentages = piechart.getAllSliceSizePercentages();
          
//           console.log("here");
          
//           var medres = 3;
//           var lfortunate = 5;
//           var locbus = 4;
          
          
//           document.getElementById("medres").value = 3;
//           document.getElementById("lfortunate").value = 4;
//           document.getElementById("locbus").value = 5;
          
          
//           // console.log(percentages);
          
         


//         }

     

  
      
      
      
      
        /*
         * Generates n proportions with a minimum percentage gap between them
         */
        function generateRandomProportions(n, min) {

            // n random numbers 0 - 1
            var rnd = Array.apply(null, {length: n}).map(function(){ return Math.random(); });

            // sum of numbers
            var rndTotal = rnd.reduce(function(a, v) { return a + v; }, 0);

            // get proportions, then make sure each propoertion is above min
            return validateAndCorrectProportions(rnd.map(function(v) { return v / rndTotal; }), min);


            function validateAndCorrectProportions(proportions, min) {
                var sortedProportions = proportions.sort(function(a,b){return a - b});

                for (var i = 0; i < sortedProportions.length; i += 1) {
                    if (sortedProportions[i] < min) {
                        var diff = min - sortedProportions[i];
                        sortedProportions[i] += diff;
                        sortedProportions[sortedProportions.length - 1] -= diff;
                        return validateAndCorrectProportions(sortedProportions, min);
                    }
                }

                return sortedProportions;
            }
        }

        /*
         * Array sorting algorithm
         */
        function knuthfisheryates2(arr) {
            var temp, j, i = arr.length;
            while (--i) {
                j = ~~(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            return arr;
        }
    }

})();





