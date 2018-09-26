import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-washingmachine",
  templateUrl: "./washingmachine.component.html",
  styleUrls: ["./washingmachine.component.css"]
})
export class WashingmachineComponent implements OnInit {
  washingmachine = [
    {
      img: "../../../assets/img/products/washingmachine/intensecleanmukhtes.jpg",
      title: "Καθαριστικό για μύκητες, πλυντηρίου ρούχων και πιάτων",
      desc:
        "IntenseClean, Για υγιεινή καθαριότητα σε πλυντήρια πιάτων και πλυντήρια ρούχων ",
      link:
        "https://www.miele.gr/domestic/appliance-service-1821.htm?mat=10717070&name=GP_CL_WG_252_P",
      price: "12"
    },
    {
      img: "../../../assets/img/products/washingmachine/intensecleanalata1.jpg",
      title: "Καθαριστικό αλάτων πλυντηρίου ρούχων και πιάτων",
      desc:
        "Απομακρύνει επιβλαβείς επικαθίσεις αλάτων από πλυντήρια πιάτων και ρούχων. ",
      link:
        "https://www.miele.gr/domestic/appliance-service-1821.htm?mat=10131070&name=GP_DC_WG_0252_P",
      price: "12"
    }, 
    {
      img: "../../../assets/img/products/washingmachine/tabs.jpg",
      title: "Ταμπλέτες αποσκλήρυνσης νερού πλυντηρίου ρούχων",
      desc:
        "H ασφαλής διπλή προστασία από τα άλατα για ρούχα και πλυντήρια ρούχων. 60 ταμπλέτες ",
      link:
        "https://www.miele.gr/domestic/appliance-service-1821.htm?mat=10128710&name=GP_WS_W_0602_T",
      price: "26"
    }, 
    {
      img: "../../../assets/img/products/washingmachine/twindoscare.jpg",
      title: "Καθαριστικό για το σύστημα δοσολογίας TwinDos",
      desc:
        "Για ξέβγαλμα των γραμμών δοσομετρητή TwinDos,Χρήση πριν από μεγάλη περίοδο αδράνειας",
      link:
        "https://www.miele.gr/domestic/appliance-service-1821.htm?mat=10563710&name=GP_TD_151_L",
      price: "14"
    }, 
    {
      img: "../../../assets/img/products/washingmachine/ultracolor.jpg",
      title: "Υγρό απορρυπαντικό UltraColor 2 για χρωματιστά",
      desc:
        "Τα καλύτερα αποτελέσματα πλύσης στους 20/30/40/60° C,Μεγάλης απόδοσης — για 30 πλύσεις ",
      link:
        "https://www.miele.gr/domestic/miele-detergents-2165.htm?mat=10223660&name=WA_UC_2003_L",
      price: "14"
    }, 
    {
      img: "../../../assets/img/products/washingmachine/intensecleanalata1.jpg",
      title: "Καθαριστικό αλάτων πλυντηρίου ρούχων και πιάτων",
      desc:
        "IntenseClean, Για υγιεινή καθαριότητα σε πλυντήρια πιάτων και πλυντήρια ρούχων ",
      link:
        "https://www.miele.gr/pmedia/30/Z17/20000136214-000-00_20000136214.jpg",
      price: "12"
    }, 
    {
      img: "https://5.imimg.com/data5/YU/GS/GLADMIN-48332821/miele-detergents-wa-up1-1501-l-500x500.png",
      title: "Καθαριστικό αλάτων πλυντηρίου ρούχων και πιάτων",
      desc:
        "IntenseClean, Για υγιεινή καθαριότητα σε πλυντήρια πιάτων και πλυντήρια ρούχων ",
      link:
        "data:image/jpeg;base64,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",
      price: "12"
    }, 
    {
      img: "https://www.miele.gr/pmedia/30/Z17/20000123341-000-00_20000123341.jpg",
      title: "Καθαριστικό αλάτων πλυντηρίου ρούχων και πιάτων",
      desc:
        "IntenseClean, Για υγιεινή καθαριότητα σε πλυντήρια πιάτων και πλυντήρια ρούχων ",
      link:
        "https://www.miele.gr/pmedia/30/Z17/20000123341-000-00_20000123341.jpg",
      price: "12"
    }, 

  ];

  constructor() {}

  ngOnInit() {}
}
