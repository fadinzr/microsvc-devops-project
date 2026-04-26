// data-service-go/main.go
package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"

    _ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
)

type PriceData struct {
    Date  string  `json:"date"`
    Price float64 `json:"price"`
}

func main() {
    // Database connection
    dsn := "root:rootpassword@tcp(mysql_db:3306)/cropdata?parseTime=true"
    var db *sql.DB
    var err error
    for i := 0; i < 10; i++ {
        db, err = sql.Open("mysql", dsn)
        if err == nil {
            err = db.Ping()
            if err == nil {
                log.Println("Successfully connected to the database!")
                break
            }
        }
        log.Printf("Could not connect to database... retrying in 5 seconds. Error: %v", err)
        time.Sleep(5 * time.Second)
    }
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // Router
    r := mux.NewRouter()
    r.HandleFunc("/prices/{crop}/{region}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        crop := vars["crop"]
        region := vars["region"]

        rows, err := db.Query("SELECT date, price FROM crop_prices WHERE crop_name = ? AND region = ?", crop, region)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer rows.Close()

        var prices []PriceData
        for rows.Next() {
            var p PriceData
            var t time.Time
            if err := rows.Scan(&t, &p.Price); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            p.Date = t.Format("2006-01-02")
            prices = append(prices, p)
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(prices)
    }).Methods("GET")

    fmt.Println("Go Data Service listening on port 8081")
    log.Fatal(http.ListenAndServe(":8081", r))
}
