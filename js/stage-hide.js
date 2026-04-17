/* */ 

// LOGIC STEPS

// GAME MENTOR

        const cushion = {
            xClosed: 100,
            yClosed: 150,

            xOpen: 100,
            yOpen: 200,

            width: 100,
            height: 40,

            isOpen: false
        };

        const drawer = {
            xClosed: 50,
            yClosed: 100,

            xOpen: 300,
            yOpen: 200,

            width: 100,
            height: 40,

            isOpen: false
        };

        //console.log(`Cushion: ${cushion.isOpen}`)
        //console.log(`Drawer: ${drawer.isOpen}`);

        const objects = [cushion, drawer];

        canvas.addEventListener("click", (e) => {
            const rect = canvas.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            objects.forEach(function (obj) {

                let currentX;
                let currentY;

                if (obj.isOpen) {
                    currentX = obj.xOpen;
                    currentY = obj.yOpen;
                } else {
                    currentX = obj.xClosed;
                    currentY = obj.yClosed;
                }

                if (
                    mouseX >= currentX &&
                    mouseX <= currentX + obj.width &&
                    mouseY >= currentY &&
                    mouseY <= currentY + obj.height
                ) {
                    obj.isOpen = !obj.isOpen;
                }
            });
        })




        function stage3() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let drawX;
            let drawY;

            if (cushion.isOpen) {
                drawX = cushion.xOpen;
                drawY = cushion.yOpen;
            } else {
                drawX = cushion.xClosed;
                drawY = cushion.yClosed;
            }

            ctx.fillStyle = "blue";
            ctx.fillRect(drawX, drawY, cushion.width, cushion.height);

            if (drawer.isOpen) {
                drawX = drawer.xOpen;
                drawY = drawer.yOpen;
            } else {
                drawX = drawer.xClosed;
                drawY = drawer.yClosed;
            }

            ctx.fillStyle = "red";
            ctx.fillRect(drawX, drawY, drawer.width, drawer.height);

            requestAnimationFrame(stage3);

        }

        //stage3();