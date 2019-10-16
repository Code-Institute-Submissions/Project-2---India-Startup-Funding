queue()
    .defer(d3.csv, "startupData.csv")
    .await(makeGraphs);


// change amount to float
// format data date
function makeGraphs(error, startupcsv) {

    let parse_date = d3.time.format("%d/%m/%Y").parse;

    startupcsv.forEach(function(d) {

        d.amount = d.amount.replace(/,/g, '')
        d.amount = parseFloat(d.amount)


        d.date = parse_date(d.date);
    })




    // Clean data on industry and funding
    let cleaned_data = _.map(startupcsv, function(datanum) {
        let copy = { ...datanum };
        if (copy.industry == "ECommerce" || copy.industry == "Ecommerce" || copy.industry == "E-Commerce" || copy.industry == "E-commerce" || copy.industry == "ecommerce") {
            copy.industry = "eCommerce";
        }
        if (copy.industry == "Ed-Tech" || copy.industry == "Fin-Tech" || copy.industry == "Information Technology" || copy.industry == "FinTech" || copy.industry == "Financial Tech" || copy.industry == "IT" || copy.industry == "EdTech" || copy.industry == "Logistic Tech" || copy.industry == "Logistics Tech") {
            copy.industry = "Technology";
        }
        if (copy.industry == "Health and Wellness" || copy.industry == "Health & Fitness App" || copy.industry == "Health Care" || copy.industry == "nan") {
            copy.industry = "Healthcare";
        }


        if (copy.funding == "Seed/ Angel Funding" || copy.funding == "Seed/Angel Funding" || copy.funding == "Seed\\nFunding" || copy.funding == "Seed / Angle Funding" || copy.funding == "Seed Round" || copy.funding == "Seed / Angel Funding" || copy.funding == "Angel / Seed Funding") {
            copy.funding = "Seed Funding";
        }
        if (copy.funding == "Pre-Series A" || copy.funding == "pre-Series A" || copy.funding == "Series A" || copy.funding == "Series B" || copy.funding == "Series C" || copy.funding == "Series D" || copy.funding == "Venture Round") {
            copy.funding = "Venture Capital";
        }
        if (copy.funding == "Equity" || copy.funding == "Private Equity Round") {
            copy.funding = "Private Equity";
        }
        
         if (copy.startupName == "Ola") {
            copy.startupName = "Ola Cabs";
        }
        if (copy.startupName == "Paytm Marketplace") {
            copy.startupName = "Paytm";
        }
        
        return copy;
    })
    var ndx = crossfilter(cleaned_data);



    // Row Chart - Number of Startup by State
    var state_dim = ndx.dimension(dc.pluck('state'));
    var no_of_startup_by_state = state_dim.group().reduceSum(function(d) { return 1; });

    let rowChart = dc.rowChart('#number-of-startup-by-state')


    rowChart
        .width(700)
        .height(500)
        .margins({ top: 50, right: 50, bottom: 50, left: 50 })
        .dimension(state_dim)
        .group(no_of_startup_by_state)
        .data(function(d) { return d.top(10); })
        .useViewBoxResizing(true)
        .xAxis().ticks(10);




    //Pie Chart- Funding Breakdown (In Value)
    var funding_dim = ndx.dimension(dc.pluck('funding'));
    var funding = funding_dim.group().reduceSum(function(d) {
        if (isNaN(d.amount)) {
            return 0;
        }
        return d.amount;
    });


    dc.pieChart('#funding-breakdown-usd')
        .height(400)
        .radius(160)
        .transitionDuration(1500)
        .dimension(funding_dim)
        .group(funding)
        .useViewBoxResizing(true)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': $' + d.data.value +
                    ' (' + dc.utils.printSingleValue((d.endAngle -
                        d.startAngle) / (2 * Math.PI) * 100) + '%)';
            })
        });




    // Pie Chart - Funding Breakdown (No of Startup)
    var funding2_dim = ndx.dimension(dc.pluck('funding'));
    var funding2 = funding2_dim.group().reduceSum(function(d) {
        return 1;
    });


    dc.pieChart('#funding-breakdown-startupNo')
        .height(400)
        .radius(160)
        .transitionDuration(1500)
        .dimension(funding2_dim)
        .group(funding2)
        .useViewBoxResizing(true)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': ' + d.data.value +
                    ' (' + dc.utils.printSingleValue((d.endAngle -
                        d.startAngle) / (2 * Math.PI) * 100) + '%)';
            })
        });




    // Bar Chart1 - Funding Received by State
    var state_dim = ndx.dimension(dc.pluck('state'));
    var funding_received_by_state = state_dim.group().reduceSum(function(d) {
        if (isNaN(d.amount)) {
            return 0;
        }
        return d.amount;
    });



    var filteredGroup1 = (function(funding_received_by_state) {
        return {
            all: function() {
                return funding_received_by_state.top(6).filter(function(d) {
                    return d.key != "Not mentioned";
                });
            }
        };
    })(funding_received_by_state);

  
    let barChart1 = dc.barChart('#funding-received-by-state')
    barChart1
        .width(600)
        .height(500)
        .margins({ top: 50, right: 50, bottom: 50, left: 100 })
        .dimension(state_dim)
        .group(filteredGroup1)
        .colors(d3.scale.ordinal().range(["#6baed6"]))
        .ordering(function(d) { return -d.value })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .renderHorizontalGridLines(true)
        .useViewBoxResizing(true)
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Name of State")
        .yAxisLabel("Investment Value (USD)")
        .yAxis().ticks(10);




    // Bar Chart2 - Funding Received by Industry
    var industry_dim = ndx.dimension(dc.pluck('industry'));
    var funding_received_by_industry = industry_dim.group().reduceSum(function(d) {
        if (isNaN(d.amount)) {
            return 0;
        }
        return d.amount;
    });

    let barChart2 = dc.barChart('#funding-received-by-industry')

    var filteredGroup2 = (function(funding_received_by_industry) {
        return {
            all: function() {
                return funding_received_by_industry.top(6).filter(function(d) {
                    return d.key != "Not mentioned";
                });
            }
        };
    })(funding_received_by_industry);


    barChart2
        .width(600)
        .height(500)
        .margins({ top: 50, right: 50, bottom: 50, left: 100 })
        .dimension(industry_dim)
        .group(filteredGroup2)
        .colors(d3.scale.ordinal().range(["#fdae6b"]))
        .ordering(function(d) { return -d.value })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .renderHorizontalGridLines(true)
        .useViewBoxResizing(true)
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Type of Industry")
        .yAxisLabel("Investment Value (USD)")
        .yAxis().ticks(10);




    // Bar Chart3 - Startup with most funding
    var startupName_dim = ndx.dimension(dc.pluck('startupName'));
    var startup_with_most_funding = startupName_dim.group().reduceSum(function(d) {
        if (isNaN(d.amount)) {
            return 0;
        }
        return d.amount;
    });

    let barChart3 = dc.barChart('#startup_with_most_funding')

    var filteredGroup3 = (function(startup_with_most_funding) {
        return {
            all: function() {
                return startup_with_most_funding.top(6).filter(function(d) {
                    return d.key != "Not mentioned";
                });
            }
        };
    })(startup_with_most_funding);


    barChart3
        .width(600)
        .height(500)
        .margins({ top: 50, right: 50, bottom: 50, left: 100 })
        .dimension(startupName_dim)
        .group(filteredGroup3)
        .colors(d3.scale.ordinal().range(["#74c476"]))
        .ordering(function(d) { return -d.value })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .renderHorizontalGridLines(true)
        .useViewBoxResizing(true)
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Startup Name")
        .yAxisLabel("Investment Value (USD)")
        .yAxis().ticks(10);



    // Stack Chart  - Investment Value By Month
    // format date to month yr
     let dateFormat = d3.time.format("%b %Y")
            var date_dim = ndx.dimension(function(d){
              return dateFormat(d.date)
            });
            
            
           
            
            var private_equity = date_dim.group().reduceSum(function(d) {
                if (d.funding == "Private Equity" && !isNaN(d.amount)) {
                    return d.amount;
                } else{
               return 0;
                }
            });
            
            var seed_funding = date_dim.group().reduceSum(function(d) {
                if (d.funding == "Seed Funding" && !isNaN(d.amount)) {
                    return d.amount;
                } else{
               return 0;
                }
            });
            
            
            console.log(seed_funding.top(10));
            
            // console.log(seed_funding.top(10)); to find out if the value is a number
            // if the value is NAN, then write <&& !isNaN(d.amount)>
            
            
            let barChart = dc.barChart('#investment-value-by-month')
            
            barChart
                .width(1400)
                .height(500)
                .margins({ top: 50, right: 100, bottom: 50, left: 100 })
                .dimension(date_dim)
                .group(private_equity, "Private Equity")
                .stack(seed_funding, "Seed Funding")
                // .transitionDuration(500)
                .x(d3.scale.ordinal())
                .renderHorizontalGridLines(true)
                .legend(dc.legend().x(1200).y(0).itemHeight(25).gap(5))
                .useViewBoxResizing(true)
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Month")
                .yAxisLabel("Investment Value (USD)")
                .yAxis().ticks(4)


    barChart.ordering(function(d) {
        // convert Feb 2019 to 01/02/2019 so that the chart can sort correctly
        return d3.time.format("%b %Y").parse(d.key)
    })





    dc.renderAll();
}
