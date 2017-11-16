var paymentmode = [{
                 name: "CHEQUE"
                 },{
                 name: "CASH"
                },{
                name: "EFTPOS"

                },{
                name: "MOTOR PASS"

                },{
                name: "MOTOR CHARGE"

                },{
                name: "FLEET CARD"

                },{
                name: "AMERICAN EXPRESS"

                }];

                var shipping = [{
                                 name: "Air"
                                 },{
                                 name: "Water"
                                },{
                                name: "Road"

                                },{
                                name: "Train"

                                },{
                                name: "Pick Up"

                                },{
                                name: "C.O.D"

                                },{
                                name: "Federal Express"

                                }];
                                var comment = [{
                                                 name: "Final Sale"
                                                 },{
                                                 name: "Thank You"
                                                },{
                                                name: "We Appreciate Your Bussiness"

                                                },{
                                                name: "Happy New year...!!"

                                                },{
                                                name: "Happy Holdiays...!!"

                                                },{
                                                name: "Happy Easter...!!"

                                                },{
                                                name: "Pick Your ASAP"

                                                }];
												   var Dstatus = [{
                                                 name: "To be Printed",
												 value:"Print"
                                                 },{
                                                 name: "To be Emailed",
												 value:"Email"
                                                },{
                                                name: "To be Printed and Emailed",
												value:"PrintAndEmail"

                                                },{
                                                name: "Already Printed or Sent",
												value:"Nothing"

                                                }];
module.exports={
payment:paymentmode,
ship:shipping,
com:comment,
d_status:Dstatus



}
