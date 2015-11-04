(function () {
    
    $("#resetButton").click(function() {
        location.reload();
    });
    
    $("#helpButton").click(function() {
        showImgNum();
    });
    
    function showImgNum() {
        var $num = $("img").attr("src");
        var picNum = $num.substring(7,9);
        
        var label = $("<p>").attr("id", "picText").text(picNum);
        
        console.log(label)
    }
        
    $("td").click(tileClick);

    function isEmptySquare($image) {
        var altText = $image.attr("alt");

        if (altText === "empty") {
            return true;
        } else {
            return false;
        }

    }

    function tileClick() {
        var $td, $clickedImg, $emptyImg, tempSrc;

        $td = $(this);

        //See if we clicked on the empty spot to give message.
        $clickedImg = $td.children().first();
        console.log($clickedImg);
        if (isEmptySquare($clickedImg)) {
            alert("Click on an image next to this square to move it.");
        } else {

            // Look for empty square

            $emptyImg = checkForEmpty($td);
            console.log($emptyImg);

            if ($emptyImg === null) {
                alert("Click on an image next to the empty square to move it.");

            } else {

                // Swap Images
                tempSrc = $clickedImg.attr("src");
                $clickedImg.attr("src", $emptyImg.attr("src"));
                $emptyImg.attr("src", tempSrc);

                tempSrc = $clickedImg.attr("alt");
                $clickedImg.attr("alt", $emptyImg.attr("alt"));
                $emptyImg.attr("alt", tempSrc);
                
                // Check for win
                
                if(checkForWin() ) {
                    $("#puzzleGrid").addClass("win");
                }

            }
        }

    }

    function checkForEmpty($td) {

        var id = $td.attr("id");
        var row = id.substring(4, 5);
        var col = id.substring(5, 6);


        //Check Top
        if (row > 1) {
            newRow = parseInt(row) - 1;
            newCol = col;


            var $img = checkCellForEmpty(newRow, newCol);

            if (isEmptySquare($img)) {
                //Found the empty square
                return $img;
                
            }
        }

        //Check Bottom
        if (row < 4) {
            newRow = parseInt(row) + 1;
            newCol = col;
            $img = checkCellForEmpty(newRow, newCol);
            console.log($img);

            if (isEmptySquare($img)) {
                //Found the empty square
                return $img;
              
            }

        }

        //Check Left
        if (col > 1) {
            newRow = row;
            newCol = parseInt(col) - 1;
            $img = checkCellForEmpty(newRow, newCol);

            if (isEmptySquare($img)) {
                //Found the empty square
                return $img;
           
            }

        }

        //Check Right
        if (col < 4) {
            newRow = row;
            newCol = parseInt(col) + 1;
            $img = checkCellForEmpty(newRow, newCol);

            if (isEmptySquare($img)) {
                //Found the empty square
                return $img;
       
            }

        }
        return null;
    }

    function checkCellForEmpty(row, col) {

        idToCheck = "#cell" + row + col;
        $img = $(idToCheck).children().first();

        return $(idToCheck).children().first();

    }

    function checkForWin() {
        var counter, $allImages, isWin;

        isWin = true;
        counter = 1;
        $allImages = $("img").each(function (index, element) {
            var altText = $(this).attr("alt");
            if (counter === 16) {
            //should be empty
            if (altText != "empty") {
                isWin = false;
                return false;
            }
            }
            else {
             if (altText != counter) {
                 isWin = false;
                 return false;
             }
            }

            counter = counter + 1

        });

        return isWin;
    }
    

 
})();