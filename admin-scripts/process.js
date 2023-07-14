import { polyToCoord } from '@/admin-scripts/polyline';


const colors = ["#525FE1", "#FB2576", "#161853", "#C490E4", "#C490E4", "#F86F03", "#495464", "#FD5E53", "#08FFC8", "#FB2576"]

const processRoutes = (routes) => {

    let start = routes[0].optimization.stops[0].location_metadata.snapped_coordinate


    let routesV2 = routes.map((element, idx)=>{
        element.optimization.stops.shift()
        element.optimization.stops.shift()

        let polyline = polyToCoord(element.directions.polyline6)
        let waypoints = []
        // let details = []
        element.optimization.stops.map((stop, i)=>{
            waypoints.push(stop.location_metadata.snapped_coordinate)
            waypoints.push(stop.dropoffs[0])
        })
        let rName = element.routeId
        let rlogId = element.runlogId
        let color = colors[idx]

        return {polyline, waypoints, rName, rlogId, color, 'stops' : element.optimization.stops }
    })


    return {start, routesV2}
}



export {processRoutes}