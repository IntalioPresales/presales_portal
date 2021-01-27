import { Component, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AngularFirestore } from '@angular/fire/firestore';
function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#0eb795"),
      am4core.color("#36a5a9"),
      am4core.color("#46e1c3"),
      am4core.color("#1babf2")
    ];
  }
}
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_myTheme);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartXY: any;
  public totalnumberofproposals = 0;
  public lostproposals = 0;
  public wonproposals = 0;
  variable: XYData = { name: '', steps: 0, href: '' };
  public arraytype: Array<XYData> = [];
  public activerfpscount = 0;
  users: any[] = [

    {
      "firstname": "Yassine",
      "lastname": "ARRAB",
      "country": "Algeria",
      "currency": "USD",
      "href": "./assets/Algeria/yassine-arrab.jfif",
      "email": "y.aarab@everteam-gs.com"
    },
    {
      "firstname": "Amer",
      "lastname": "ZAINALABDIN",
      "country": "KSA",
      "currency": "SAR",
      "href": "../../assets/img/KSA/amer.png",
      "email": "a.abdin@comptechco.com"
    },
    {
      "firstname": "Wissam",
      "lastname": "ROUHANA",
      "country": "Algeria",
      "currency": "USD",
      "href": "../../assets/img/Algeria/wissam.jfif",
      "email": "w.rouhana@everteam-gs.com"
    },
    {
      "firstname": "Karim",
      "lastname": "BADR",
      "country": "Egypt",
      "currency": "EGP",
      "href": "../../assets/img/Egypt/karim.jfif",
      "email": "k.badr@everteam-gs.com"

    },
    {
      "firstname": "Ramez",
      "lastname": "ALKARA",
      "country": "Egypt",
      "currency": "EGP",
      "email": "r.alkarra@everteam-gs.com"
    },
    {
      "firstname": "Rony",
      "lastname": "HONEIN",
      "country": "France",
      "currency": "EUR",
      "href": "../../assets/img/France/rony-honein.png",
      "email": "r.honein@ebsgs-fr.com"
    },
    {
      "firstname": "Hadi",
      "lastname": "ABDALLAH",
      "country": "France",
      "currency": "EUR",
      "href": "../../assets/img/France/hadi-abdallah.jpg",
      "email": "hadi.abdallah@ebsgs-fr.com"

    },
    {
      "firstname": "Mamar",
      "lastname": "MERABI",
      "country": "France",
      "currency": "EUR",
      "href": "../../assets/img/France/mamar.png",
      "email": "m.merabi@ebsgs-fr.com"
    },
    {
      "firstname": "Bilal",
      "lastname": "HMEDEH",
      "country": "KSA",
      "currency": "SAR",
      "email": "b.hmedeh@everteam-gs.com"
    },
    {
      "firstname": "George",
      "lastname": "MAALOUF",
      "country": "KSA",
      "currency": "SAR",
      "href": "../../assets/img/KSA/maalouf.jfif",
      "email": "g.maalouf@everteam-gs.com"
    },
    {
      "firstname": "Roland",
      "lastname": "SALAMEH",
      "country": "Lebanon",
      "currency": "USD",
      "href": "../../assets/img/Lebanon/roland-salameh.jpg",
      "email": "r.salameh@everteam-gs.com"
    },
    {
      "firstname": "MarieTherese",
      "lastname": "AMMOUN",
      "country": "Lebanon",
      "currency": "USD",
      "email": "m.ammoun@everteam-gs.com"
    },
    {
      "firstname": "Jean-Pierre",
      "lastname": "LA-HAUSSE-DE-LALOUVIERE",
      "country": "Mauritius",
      "currency": "USD",
      "email": "jplhl@everteam-gs.com"
    },
    {
      "firstname": "Yassine",
      "lastname": "ABOU KADRI",
      "country": "Morocco",
      "currency": "USD",
      "href": "../../assets/img/Morroco/yasine-abou-kadri.jpg",
      "email": "y.aboukadri@everteam-gs.com"
    },
    {
      "firstname": "Maram",
      "lastname": "HUSSEIN",
      "country": "Qatar",
      "currency": "QAR",
      "href": "../../assets/img/Qatar/maram-2.jpg",
      "email": "m.hussein@everteam-gs.com"
    },
    {
      "firstname": "Hussein",
      "lastname": "ABDALLAH",
      "country": "Qatar",
      "currency": "QAR",
      "email": "h.abdallah@everteam-gs.com"
    },
    {
      "firstname": "Ali",
      "lastname": "SHARARA",
      "country": "Qatar",
      "currency": "QAR",
      "href": "../../assets/img/Qatar/ali-sharara.png",
      "email": "a.sharara@everteam-gs.com"
    },
    {
      "firstname": "Hussein",
      "lastname": "CHOKR",
      "country": "Qatar",
      "currency": "QAR",
      "href": "../../assets/img/Qatar/hussein-chokr.png",
      "email": "h.chokr@everteam-gs.com"
    },
    {
      "firstname": "Georges",
      "lastname": "ZORBA",
      "country": "UAE",
      "currency": "AED",
      "href": "../../assets/img/UAE/zorba.jfif",
      "email": "g.zorba@everteam-gs.com"
    },
    {
      "firstname": "Adeel",
      "lastname": "RAHMAN",
      "country": "UAE",
      "currency": "AED",
      "href": "../../assets/img/UAE/adeel.jfif",
      "email": "a.rahman@everteam-gs.com"
    },
    {
      "firstname": "Karl",
      "lastname": "MELKI",
      "country": "Lebanon",
      "currency": "USD",
      "email": "k.melki@everteam-gs.com"
    },
    {
      "firstname": "Samer",
      "lastname": "HOBEIKA",
      "country": "Lebanon",
      "currency": "USD",
      "email": "s.hobeika@everteam-gs.com"
    },
    {
      "firstname": "Salam",
      "lastname": "EID",
      "country": "Kuwait",
      "currency": "USD",
      "email": "salam.eid@worldtek.co"
    },
    {
      "firstname": "Mazen",
      "lastname": "FARAH",
      "country": "Lebanon",
      "currency": "LBP",
      "email": "m.farah@everteam-gs.com"
    },
    {
      "firstname": "Zeina",
      "lastname": "ATRISSI",
      "country": "KSA",
      "currency": "SAR",
      "href": "../../assets/img/KSA/zeina.jpg",
      "email": "z.atrissi@everteam-gs.com"
    },
    {
      "firstname": "Stephanie",
      "lastname": "AZARIAN",
      "country": "Lebanon",
      "currency": "LBP",
      "email": "s.azarian@everteam-gs.com"
    },
    {
      "firstname": "Rita",
      "lastname": "JAWHAR",
      "country": "Qatar",
      "currency": "QAR",
      "href": "./assets/img/Qatar/rita-jawhar.jpg",
      "email": "r.jawhar@everteam-gs.com"
    },
    {
      "firstname": "Wasfi",
      "lastname": "ELLOUZE",
      "country": "France",
      "currency": "EUR",
      "href": "../../assets/img/France/wasfi.jfif",
      "email": "w.ellouze@ebsgs-fr.com"

    },
    {
      "firstname": "Mohammad",
      "lastname": "HASSAN",
      "country": "Lebanon",
      "currency": "USD",
      "href": "../../assets/img/Lebanon/mhamad-hasan.jfif",
      "email": "m.hassan@everteam-gs.com"

    },
    {
      "firstname": "Antoine",
      "lastname": "HRAOUI",
      "country": "Lebanon",
      "currency": "USD",
      "email": "a.hraoui@everteam-gs.com"
    },
    {
      "firstname": "Karim",
      "lastname": "THOMAS",
      "country": "Qatar",
      "currency": "QAR",
      "href": "./assets/img/Qatar/karim-thomas.jfif",
      "email": "k.thomas@everteam-gs.com"
    },
    {
      "firstname": "Lara",
      "lastname": "KANAAN",
      "country": "Lebanon",
      "currency": "LBP",
      "email": "l.kanaan@everteam-gs.com"
    },
    {
      "firstname": "Yahya",
      "lastname": "ABIHAIDAR",
      "country": "Lebanon",
      "currency": "LBP",
      "email": "y.abihaidar@everteam-gs.com"
    },
    {
      "firstname": "Mohammed",
      "lastname": "Alkhamis",
      "country": "KSA",
      "currency": "SAR",
      "href": "../../assets/img/KSA/mohamad-alkhamis.jfif",
      "email": "m.Alkhamis@everteam-gs.com"
    }
  ]
  constructor(public globals: Globals, private db: AngularFirestore) { }
  checkRoleExistence(name: string): boolean {
    return this.arraytype.some(r => r.name === name);
  }
  incrementsteps(name: string) {
    this.arraytype.forEach(x => {
      if (x.name == name) {
        x.steps++;
      }
    })
  }
  ngOnInit() {
    this.chartXY = am4core.create("chartdiv", am4charts.XYChart);
    this.chartXY.hiddenState.properties.opacity = 0; // this creates initial fade-in

    this.chartXY.paddingBottom = 30;

    let categoryAxis = this.chartXY.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    let valueAxis = this.chartXY.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    let series = this.chartXY.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = - 6;
    series.columnsContainer.zIndex = 100;

    let columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
    series.mainContainer.mask = undefined;

    let cursor = new am4charts.XYCursor();
    this.chartXY.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    let bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.mouseEnabled = false;
    bullet.verticalCenter = "bottom";
    bullet.interactionsEnabled = false;

    let hoverState = bullet.states.create("hover");
    let outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius, target) {
      let circleBullet = target.parent as any;
      return circleBullet.circle.pixelRadius + 10;
    })

    let image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "href";

    image.adapter.add("mask", function (mask, target) {
      let circleBullet = target.parent as any;
      return circleBullet.circle;
    })

    let previousBullet;
    this.chartXY.cursor.events.on("cursorpositionchanged", function (event) {
      let dataItem = series.tooltipDataItem as any;

      if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

          let hs = bullet.states.getKey("hover");
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    })
    this.users.forEach(element => {
      this.db.firestore
        .collection(element.firstname + " " + element.lastname)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            if (this.globals.currentuser.firstname == "Ali" && this.globals.currentuser.lastname == "SHARARA") {
              if (element.country == "Qatar") {

                if (element.firstname == "Ali" && element.lastname == "SHARARA" || element.firstname == "Hussein" && element.lastname == "ABDALLAH") {

                }
                else if (this.checkRoleExistence(element.firstname + ' ' + element.lastname)) {
                  this.incrementsteps(element.firstname + ' ' + element.lastname)
                } else {
                  var x = {
                    name: element.firstname + ' ' + element.lastname,
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {
                      if (doc.data().rfpstatus == "In Progress") {
                        console.log(doc.data());
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })
              }
            }
            else if (this.globals.currentuser.firstname == "Georges" && this.globals.currentuser.lastname == "ZORBA") {
              if (element.country == "UAE") {
                if (element.firstname == "Georges" && element.lastname == "ZORBA") {

                }
                else if (this.checkRoleExistence(element.firstname + ' ' + element.lastname)) {
                  this.incrementsteps(element.firstname + ' ' + element.lastname)
                } else {
                  var x = {
                    name: element.firstname + ' ' + element.lastname,
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {
                      if (doc.data().rfpstatus == "In Progress") {
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })

              }
            }
            else if (this.globals.currentuser.firstname == "George" && this.globals.currentuser.lastname == "MAALOUF") {
              if (element.country == "KSA") {
                if (element.firstname == "George" && element.lastname == "MAALOUF") {

                }
                else if (this.checkRoleExistence(element.firstname + ' ' + element.lastname)) {
                  this.incrementsteps(element.firstname + ' ' + element.lastname)
                } else {
                  var x = {
                    name: element.firstname + ' ' + element.lastname,
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {
                      if (doc.data().rfpstatus == "In Progress") {
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })

              }

            }
            else if (this.globals.currentuser.firstname == "Rony" && this.globals.currentuser.lastname == "HONEIN") {
              if (element.country == "France") {
                if (element.firstname == "Rony" && element.lastname == "HONEIN") {

                }
                else if (this.checkRoleExistence(element.firstname + ' ' + element.lastname)) {
                  this.incrementsteps(element.firstname + ' ' + element.lastname)
                } else {
                  var x = {
                    name: element.firstname + ' ' + element.lastname,
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {
                      if (doc.data().rfpstatus == "In Progress") {
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })

              }

            }
            else if (this.globals.currentuser.firstname == "Hussein" && this.globals.currentuser.lastname == "ABDALLAH") {
              if (element.country == "France" || element.country == "Morocco" || element.country == "Algeria" || element.country == "Qatar") {
                if (element.firstname == "Hussein" && element.lastname == "ABDALLAH") {

                }
                else if (this.checkRoleExistence(element.firstname + '')) {
                  this.incrementsteps(element.firstname + '')
                } else {
                  var x = {
                    name: element.firstname + '',
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {

                      if (doc.data().rfpstatus == "In Progress") {
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })

              }

            }
            else if (this.globals.currentuser.firstname == "Bilal" && this.globals.currentuser.lastname == "HMEDEH") {
              if (element.country == "KSA" || element.country == "Lebanon" || element.country == "UAE") {
                if (element.firstname == "Bilal" && element.lastname == "HMEDEH" || element.firstname == "Antoine" && element.lastname == "HRAOUI" || element.firstname == "Stephanie" && element.lastname == "AZARIAN") {

                }
                else if (this.checkRoleExistence(element.firstname + ' ' + element.lastname)) {
                  this.incrementsteps(element.firstname + ' ' + element.lastname)
                } else {
                  var x = {
                    name: element.firstname + ' ' + element.lastname,
                    steps: 1,
                    href: element.href
                  }
                  this.arraytype.push(x)
                }
                this.totalnumberofproposals++;
                this.db
                  .firestore
                  .collection(element.firstname + " " + element.lastname)
                  .doc(doc1.id)
                  .collection("Link")
                  .get()
                  .then(querySnapshot1 => {
                    if (querySnapshot1.empty) {
                      this.activerfpscount++;
                    }
                    querySnapshot1.forEach(doc => {
                      if (doc.data().rfpstatus == "In Progress") {
                        this.activerfpscount++;
                      }
                      if (doc.data().oppstatus == "Lost") {
                        this.lostproposals++;
                      }
                      if (doc.data().oppstatus == "Won") {
                        this.wonproposals++;
                      }
                    })

                  })

              }

            }

          });
          this.chartXY.data = this.arraytype;

        });
    });

  }

}
export interface XYData {
  name?: any;
  steps?: any;
  href?: string;
}
