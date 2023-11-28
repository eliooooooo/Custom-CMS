<?php

class Config {

    private static $configs = [];

    /**
     * Get the config file array.
     * 
     * @param array $config
     * @param string $prefix
     */
    public static function set(array $config, string $prefix = ''){
      foreach ($config as $key => $value) {
        if (is_array($value)) {
          self::set($value, $prefix . $key . '_');
        } else {
          self::$configs[$prefix . $key] = $value;
        }
      }
    }

    /**
     * Get the config value.
     * 
     * @param string $key
     * @return string
     */
    public static function get(string $key){
      return self::$configs[$key];
    }
}
